export interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  gender?: string;
  profileImg?: string;
  coverImg?: string;
  status?: boolean;
  messages?: string[];
  notifications?: string[];
  friends?: string[];
  friendRequests?: string[];
  sendRequest?: string[];
  createdAt?: string;
  updatedAt?: string;
}
