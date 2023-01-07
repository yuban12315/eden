import { Button, PageHeader } from "@arco-design/web-react";
import { IconMoonFill, IconSunFill } from "@arco-design/web-react/icon";
import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import shallow from "zustand/shallow";

import { useStore } from "../../store/index";
import { FlexDiv, IconContainer, SimpleFlexContainer } from "../Styled";
import UserBrand from "../UserBrand";

export const NavbarHeight = 100;

const Navbar: FC = () => {
  const { isDarkMode, setMode, user } = useStore(
    (state) => ({
      isDarkMode: state.mode.isDarkMode,
      setMode: state.setMode,
      user: state.user,
    }),
    shallow
  );
  const location = useLocation();
  const navigate = useNavigate();

  const switchMode = () => {
    setMode({ isDarkMode: !isDarkMode });
  };

  const handleBack = () => {
    window.history.back();
  };

  const navigateCollections = () => {
    navigate("/collection");
  };

  return (
    <SimpleFlexContainer height={NavbarHeight} padding="30px 40px">
      <PageHeader
        title={<Title onClick={navigateCollections}>EdenWeb</Title>}
        subTitle="Eden项目Web版"
        backIcon={location.pathname !== "/collection"}
        onBack={handleBack}
      />
      <FlexDiv>
        <IconContainer>
          <Button
            onClick={switchMode}
            size="mini"
            icon={isDarkMode ? <IconMoonFill /> : <IconSunFill />}
          />
        </IconContainer>

        <UserBrand user={user} />
      </FlexDiv>
    </SimpleFlexContainer>
  );
};

export default Navbar;

const Title = styled.div`
  padding: 8px 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-neutral-3);
  }
`;
