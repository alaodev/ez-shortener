import { FindAllUserUrlsOutput } from '../types/output/use-cases/find-all-user-urls.output';

export abstract class FindAllUserUrlsUseCase {
  abstract execute(userId: string): Promise<FindAllUserUrlsOutput[]>;
}
