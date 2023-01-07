import styled from "styled-components";

export const EditorViewContainer = styled.div<{ dark?: boolean }>`
  display: flex;
  flex-grow: 1;

  height: calc(100vh - 112px);
  overflow: auto;
  padding: 0 12px;
  box-sizing: border-box;

  background-color: ${(props) => (props.dark ? " #181A1B" : "#ffffff")};

  .editor-inner {
    justify-content: flex-start;
    width: 100%;
  }
  margin-bottom: 12px;
`;
