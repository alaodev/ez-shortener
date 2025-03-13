import { Url } from '../entities/url.entity';
import { CreateUrlRepositoryOutput } from '../types/output/repositories/create-url-repository.output';

export abstract class CreateUrlRepository {
  abstract createUrl(url: Url): Promise<CreateUrlRepositoryOutput>;
}
