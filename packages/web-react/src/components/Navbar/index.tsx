import React, { FC } from "react";
import { FlexDiv, IconContainer, SimpleFlexContainer } from "../Styled";
import { PageHeader, Button } from "@arco-design/web-react";
import UserBrand from "../UserBrand";
import { useStore } from "../../store/index";
import shallow from "zustand/shallow";
import { IconMoonFill, IconSunFill } from "@arco-design/web-react/icon";
import { useLocation, useNavigate } from "react-router-dom";

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
    navigate("/collection");
  };

  return (
    <SimpleFlexContainer height={100} padding="35px 40px">
      <PageHeader
        title="EdenWeb"
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
