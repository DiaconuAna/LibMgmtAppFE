export interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

export interface GetUsersResponse {
  users: User[];
}
