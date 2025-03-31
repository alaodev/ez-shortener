import { FindAllUserUrlsOutput } from '../types/output/usecases/find-all-user-urls.output';

export abstract class FindAllUserUrlsUseCase {
  abstract execute(userId: string): Promise<FindAllUserUrlsOutput>;
}
