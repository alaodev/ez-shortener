import { FindAllUserAccessOutput } from '../types/output/usecases/find-all-user-access.output';

export abstract class FindAllUserAccessUseCase {
  abstract execute(userId: string): Promise<FindAllUserAccessOutput>;
}
