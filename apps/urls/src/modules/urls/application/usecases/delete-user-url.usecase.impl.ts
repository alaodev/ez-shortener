import { NotFoundException } from '@nestjs/common';
import { DeleteUrlOwnerMatchRepository } from '../../domain/repositories/delete-url-owner-match.repository';
import { DeleteUserUrlOutput } from '../../domain/types/output/usecases/delete-user-url.output';
import { DeleteUserUrlUseCase } from '../../domain/usecases/delete-user-url.usecase';
import { DeleteUserUrlInput } from '../../domain/types/inputs/uscases';

export class DeleteUserUrlUseCaseImpl implements DeleteUserUrlUseCase {
  constructor(
    private readonly deleteUrlOwnerMatchRepository: DeleteUrlOwnerMatchRepository,
  ) {}

  async execute(data: DeleteUserUrlInput): Promise<DeleteUserUrlOutput> {
    const deletedUrl = await this.deleteUrlOwnerMatchRepository.deleteUrl({
      id: data.urlId,
      owner: data.userId,
    });
    if (!deletedUrl) throw new NotFoundException('url not found');
    return {
      id: deletedUrl.id,
    };
  }
}
