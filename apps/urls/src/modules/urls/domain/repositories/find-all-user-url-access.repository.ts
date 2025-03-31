import { FindAllUserUrlAccessRepositoryOutput } from '../types/output/repositories/find-all-user-url-access-repository.output';

export abstract class FindAllUserUrlAccessRepository {
  abstract findAllUserUrlAccess(
    ownerId: string,
    urlId: string,
  ): Promise<FindAllUserUrlAccessRepositoryOutput>;
}
