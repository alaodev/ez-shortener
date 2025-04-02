import { FindAllUserAccessRepositoryOutput } from '../types/output/repositories/find-all-user-access-repository.output';

export abstract class FindAllUserAccessRepository {
  abstract findAllUserAccess(
    userId: string,
  ): Promise<FindAllUserAccessRepositoryOutput>;
}
