import { TrackUrlAccessInput } from '../types/inputs/uscases/track-url-access.input';
import { TrackUrlAccessOutput } from '../types/output/usecases/track-url-access.output';

export abstract class TrackUrlAccessUseCase {
  abstract execute(data: TrackUrlAccessInput): Promise<TrackUrlAccessOutput>;
}
