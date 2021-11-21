import React, { FC } from "react";
import RichEditor from "rich-markdown-editor";
import Navbar from "../../components/Navbar";
import { Container, Page } from "../../components/Styled";

const Editor: FC = () => {
  return (
    <Page>
      <Navbar />
      <Container>
        <RichEditor defaultValue="Hello world!" />
      </Container>
    </Page>
  );
};

export default Editor;
