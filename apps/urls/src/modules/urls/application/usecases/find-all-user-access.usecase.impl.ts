import { FindAllUserAccessUseCase } from '../../domain/usecases/find-all-user-access.usecase';
import { FindAllUserAccessRepository } from '../../domain/repositories/find-all-user-access.repository';
import { FindAllUserAccessOutput } from '../../domain/types/output/usecases/find-all-user-access.output';

export class FindAllUserAccessUseCaseImpl implements FindAllUserAccessUseCase {
  constructor(
    private readonly findAllUserAccessRepository: FindAllUserAccessRepository,
  ) {}

  async execute(userId: string): Promise<FindAllUserAccessOutput> {
    const foundAccess =
      await this.findAllUserAccessRepository.findAllUserAccess(userId);
    return foundAccess.map((access) => ({
      id: access.id,
      address: access.address,
      browserName: access.browserName,
      browserVersion: access.browserVersion,
      osName: access.osName,
      osVersion: access.osVersion,
      url: {
        id: access.url.id,
        originalUrl: access.url.originalUrl,
        shortId: access.url.shortId,
      },
      createdAt: access.createdAt,
    }));
  }
}
