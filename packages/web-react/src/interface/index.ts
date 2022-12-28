export interface Note {
  // 自身属性

  id: string;
  title: string;
  content: string;
  creatTime: Date;
  updateTime?: Date;

  // 级联关系

  authorId: string;
  collectionId: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Collection {
  id: string;
  name: string;
  creator: User;
  createdAt: Date;
  updatedAt: Date;
}
