import { FindAllUserUrlAccessInput } from '../types/inputs/uscases/find-all-user-url-access.input';
import { FindAllUserUrlAccessOutput } from '../types/output/usecases/find-all-user-url-access.output';

export abstract class FindAllUserUrlAccessUseCase {
  abstract execute(
    data: FindAllUserUrlAccessInput,
  ): Promise<FindAllUserUrlAccessOutput>;
}
