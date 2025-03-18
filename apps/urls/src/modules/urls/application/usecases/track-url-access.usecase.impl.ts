import { CreateAccessRepository } from '../../domain/repositories/create-access.repository';
import { TrackUrlAccessInput } from '../../domain/types/inputs/uscases/track-url-access.input';
import { TrackUrlAccessOutput } from '../../domain/types/output/usecases/track-url-access.output';
import { TrackUrlAccessUseCase } from '../../domain/usecases/track-url-access.usecase';

export class TrackUrlAccessUseCaseImpl implements TrackUrlAccessUseCase {
  constructor(
    private readonly createAccessRepository: CreateAccessRepository,
  ) {}

  async execute(data: TrackUrlAccessInput): Promise<TrackUrlAccessOutput> {
    return this.createAccessRepository.createAccess(data);
  }
}
