import React, { FC } from "react";
import { SimpleFlexContainer } from "../Styled";
import { PageHeader, Avatar } from "@arco-design/web-react";
import UserBrand from "../UserBrand";

const Navbar: FC = () => {
  return (
    <SimpleFlexContainer height={100} padding="35px 80px">
      <PageHeader title="EdenWeb" subTitle="Eden项目Web版" />
      <UserBrand
        user={{
          name: "yuban12315",
          avatar: "https://avatars.githubusercontent.com/u/16523798?s=56&v=4",
        }}
      />
    </SimpleFlexContainer>
  );
};

export default Navbar;
