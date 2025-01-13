export interface User {
  id: number;
  name: string;
  username: string;
}

export interface GetUsersResponse {
  users: User[];
}
