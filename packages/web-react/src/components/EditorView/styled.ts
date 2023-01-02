import styled from "styled-components";

export const EditorViewContainer = styled.div<{ dark?: boolean }>`
  display: flex;
  flex-grow: 1;

  height: calc(100vh - 120px);
  overflow: auto;

  background-color: ${(props) => (props.dark ? " #181A1B" : "")};

  .editor-inner {
    justify-content: flex-start;
    width: 100%;
  }
  margin-bottom: 20px;
`;
