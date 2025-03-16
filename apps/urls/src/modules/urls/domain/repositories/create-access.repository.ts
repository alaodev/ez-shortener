import { Access } from '../entities/access.entity';
import { CreateAccessRepositoryOutput } from '../types/output/repositories/create-access-repository.output';

export abstract class CreateAccessRepository {
  abstract createAccess(access: Access): Promise<CreateAccessRepositoryOutput>;
}
