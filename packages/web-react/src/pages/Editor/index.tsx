import { Message } from "@arco-design/web-react";
import React, { FC, useEffect, useRef, useState } from "react";

import EditorView from "../../components/EditorView";
import Navbar from "../../components/Navbar";
import { Container, Page } from "../../components/Styled";
import { useLocalStorage } from "../../hooks";

const MARKDOWN_KEY = "MARKDOWN_KEY";

const Editor: FC = () => {
  const [getNote, setNote] = useLocalStorage<string>(MARKDOWN_KEY);
  const [content, setContent] = useState<string>("");

  const recover = () => {
    const note = getNote();
    setContent(note);
    console.log("recover", note);
  };

  useEffect(() => {
    recover();
  }, []);

  const handleChangeContent = async (content: string) => {
    setNote(content);
    Message.success("saved");
  };

  return (
    <Page>
      <Navbar />
      <Container>
        <EditorView content={content} onSave={handleChangeContent} />
      </Container>
    </Page>
  );
};

export default Editor;
