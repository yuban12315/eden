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
  background-color: var(--color-neutral-2);
  min-width: 600px;

  user-select: none;
`;

export const Container = styled.div`
  transition: all 1s;
  @media (min-width: 800px) {
    margin-left: 5%;
    width: 90%;
  }

  @media (min-width: 500px) and (max-width: 800px) {
    margin-left: 1%;
    width: 98%;
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

export const Info = styled.div`
  color: var(--color-text-3);
`;
