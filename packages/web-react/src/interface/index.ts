export interface Note {
  // 自身属性
  noteId: string;
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
