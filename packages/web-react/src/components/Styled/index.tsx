import styled from "styled-components";
interface SimpleFlexContainerProps {
  /** 默认为48px */
  height?: number;
  /** 默认为0 */
  padding?: string;
}

export const SimpleFlexContainer = styled.div<SimpleFlexContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: ${(props) => props.height || 48}px;
  padding: ${(props) => props.padding || "0"};

  user-select: none;

  .side {
    display: flex;
    align-items: center;
  }
`;

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  font-size: 14px;
  position: relative;
  background-color: var(--color-bg-1);
`;

export const Container = styled.div`
  transition: all 1s;
  @media (min-width: 1200px) {
    margin-left: 10%;
    width: 80%;
  }

  @media (min-width: 500px) and (max-width: 1200px) {
    margin-left: 10%;
    width: 80%;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  /* color: var(--color-primary-6); */
  margin-right: 4px;
`;
