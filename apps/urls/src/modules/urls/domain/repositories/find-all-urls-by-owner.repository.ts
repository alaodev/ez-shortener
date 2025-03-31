import { FindAllUrlsByOwnerRepositoryOutput } from '../types/output/repositories/find-all-urls-by-owner-repository.output';

export abstract class FindAllUrlsByOwnerRepository {
  abstract findAllUrlsByOwner(
    ownerId: string,
  ): Promise<FindAllUrlsByOwnerRepositoryOutput>;
}
