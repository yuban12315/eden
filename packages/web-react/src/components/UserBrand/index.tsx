import React, { FC } from "react";
import styled from "styled-components";
import { FlexDiv } from "../Styled";
import { Avatar } from "@arco-design/web-react";
import type { User } from "../../store/IndexDB/Models/User";

interface UserBrandProps {
  user: Pick<User, "name" | "avatar">;
}

const UserBrandContainer = styled(FlexDiv)`
  margin-left: 4px;
  .name {
    margin-left: 8px;
    color: var(--color-text-3);
    font-size: 14px;
  }
`;

const UserBrand: FC<UserBrandProps> = (props) => {
  const { user } = props;
  return (
    <UserBrandContainer>
      <Avatar size={24}>
        <img src={user.avatar} alt={`${user.name}.avatar`} />
      </Avatar>
      <span className="name"> {user.name}</span>
    </UserBrandContainer>
  );
};

export default UserBrand;
