import { FindUserByEmailOutput } from '../types/outputs/use-cases/find-user-by-email.output';

export abstract class FindUserByEmailUseCase {
  abstract execute(email: string): Promise<FindUserByEmailOutput | null>;
}
