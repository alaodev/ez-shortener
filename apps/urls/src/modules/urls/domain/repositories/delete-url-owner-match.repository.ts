import { DeleteUrlOwnerMatchRepositoryInput } from '../types/inputs/repositories/delete-url-owner-match-repository.input';
import { DeleteUrlOwnerMatchRepositoryOutput } from '../types/output/repositories/delete-url-owner-match-repository.output';

export abstract class DeleteUrlOwnerMatchRepository {
  abstract deleteUrl(
    data: DeleteUrlOwnerMatchRepositoryInput,
  ): Promise<DeleteUrlOwnerMatchRepositoryOutput | null>;
}
