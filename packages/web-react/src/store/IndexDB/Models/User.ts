import { Model, ModelBase } from "../Database";

export interface User extends ModelBase {
  name: string;
  nickname: string;
  avatar: string;
}

const UserModel = new Model<User>("User");

export default UserModel;
