import React, { FC } from "react";
import styled from "styled-components";
import { FlexDiv } from "../Styled";
import { Avatar } from "@arco-design/web-react";
import { User } from "../../interface";

interface UserBrandProps {
  user: Pick<User, "name" | "avatar">;
}

const UserBrandContainer = styled(FlexDiv)`
  .name {
    margin-left: 8px;
    color: #4e5969;
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
