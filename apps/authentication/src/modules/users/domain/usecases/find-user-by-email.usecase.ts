import { FindUserByEmailOutput } from '../types/outputs/usecases/find-user-by-email.output';

export abstract class FindUserByEmailUseCase {
  abstract execute(email: string): Promise<FindUserByEmailOutput | null>;
}
