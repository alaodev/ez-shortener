export type CreateUserRepositoryOutput = {
  id: string;
  username: string;
  email: string;
};

export type FindUserByEmailRepositoryOutput = {
  id: string;
  username: string;
  email: string;
  password: string;
};
