export interface Post {
  _id?: string;
  userId?: string;
  content?: string;
  postImg?: string;
  likes?: [
    {
      userId: string;
      _id: string;
    }
  ];
  comments?: [
    {
      userId: string;
      comment: string;
      commentImg: string;
      _id: string;
    }
  ];
  createdAt?: string;
  updatedAt?: string;
}
