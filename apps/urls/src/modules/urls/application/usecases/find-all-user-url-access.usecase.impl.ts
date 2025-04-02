import { FindAllUserUrlAccessInput } from '../../domain/types/inputs/uscases/find-all-user-url-access.input';
import { FindAllUserUrlAccessOutput } from '../../domain/types/output/usecases/find-all-user-url-access.output';
import { FindAllUserUrlAccessUseCase } from '../../domain/usecases/find-all-user-url-access.usecase';
import { FindAllUserUrlAccessRepository } from '../../domain/repositories/find-all-user-url-access.repository';

export class FindAllUserUrlAccessUseCaseImpl
  implements FindAllUserUrlAccessUseCase
{
  constructor(
    private readonly findAllUserUrlAccessRepository: FindAllUserUrlAccessRepository,
  ) {}
  async execute(
    data: FindAllUserUrlAccessInput,
  ): Promise<FindAllUserUrlAccessOutput> {
    const { userId, urlId } = data;
    const foundAccess =
      await this.findAllUserUrlAccessRepository.findAllUserUrlAccess(
        userId,
        urlId,
      );
    return foundAccess.map((access) => ({
      id: access.id,
      address: access.address,
      browserName: access.browserName,
      browserVersion: access.browserVersion,
      osName: access.osName,
      osVersion: access.osVersion,
      createdAt: access.createdAt,
    }));
  }
}
