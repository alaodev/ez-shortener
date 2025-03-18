import { DeleteUserUrlInput } from '../types/inputs/uscases/delete-user-url.input';
import { DeleteUserUrlOutput } from '../types/output/usecases/delete-user-url.output';

export abstract class DeleteUserUrlUseCase {
  abstract execute(data: DeleteUserUrlInput): Promise<DeleteUserUrlOutput>;
}
