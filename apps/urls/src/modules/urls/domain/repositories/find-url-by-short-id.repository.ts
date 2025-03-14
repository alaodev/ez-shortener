import { FindUrlByShortIdRepositoryOutput } from '../types/output/repositories/find-url-by-short-id-repository.output';

export abstract class FindUrlByShortIdRepository {
  abstract findUrlByShortId(
    shortId: string,
  ): Promise<FindUrlByShortIdRepositoryOutput | null>;
}
