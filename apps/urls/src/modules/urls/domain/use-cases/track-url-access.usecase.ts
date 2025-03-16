import { TrackUrlAccessInput } from '../types/inputs/use-cases/track-url-access.input';
import { TrackUrlAccessOutput } from '../types/output/use-cases/track-url-access.output';

export abstract class TrackUrlAccessUseCase {
  abstract execute(data: TrackUrlAccessInput): Promise<TrackUrlAccessOutput>;
}
