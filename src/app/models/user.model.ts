export interface User {
  email: string;
  id: string;
  password: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
