import React, { FC } from "react";
import { FlexDiv, IconContainer, SimpleFlexContainer } from "../Styled";
import { PageHeader, Button, Tooltip } from "@arco-design/web-react";
import UserBrand from "../UserBrand";
import { useStore } from "../../store/index";
import shallow from "zustand/shallow";
import { IconMoonFill, IconSunFill } from "@arco-design/web-react/icon";

const Navbar: FC = () => {
  const { isDarkMode, setMode, user } = useStore(
    (state) => ({
      isDarkMode: state.mode.isDarkMode,
      setMode: state.setMode,
      user: state.user,
    }),
    shallow
  );
  const switchMode = () => {
    setMode({ isDarkMode: !isDarkMode });
  };

  return (
    <SimpleFlexContainer height={100} padding="35px 80px">
      <PageHeader title="EdenWeb" subTitle="Eden项目Web版" />
      <FlexDiv>
        <IconContainer>
          <Tooltip content="切换显示模式">
            <Button
              onClick={switchMode}
              size="mini"
              icon={isDarkMode ? <IconMoonFill /> : <IconSunFill />}
            />
          </Tooltip>
        </IconContainer>

        <UserBrand user={user} />
      </FlexDiv>
    </SimpleFlexContainer>
  );
};

export default Navbar;
