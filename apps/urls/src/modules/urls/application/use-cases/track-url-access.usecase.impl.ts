import { CreateAccessRepository } from '../../domain/repositories/create-access.repository';
import { TrackUrlAccessInput } from '../../domain/types/inputs/use-cases/track-url-access.input';
import { TrackUrlAccessOutput } from '../../domain/types/output/use-cases/track-url-access.output';
import { TrackUrlAccessUseCase } from '../../domain/use-cases/track-url-access.usecase';

export class TrackUrlAccessUseCaseImpl implements TrackUrlAccessUseCase {
  constructor(
    private readonly createAccessRepository: CreateAccessRepository,
  ) {}

  async execute(data: TrackUrlAccessInput): Promise<TrackUrlAccessOutput> {
    return this.createAccessRepository.createAccess(data);
  }
}
