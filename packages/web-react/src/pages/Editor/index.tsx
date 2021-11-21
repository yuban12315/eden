import React, { FC, useEffect, useRef, useState } from "react";
import RichEditor from "rich-markdown-editor";
import Navbar from "../../components/Navbar";
import { Container, Page } from "../../components/Styled";
import { useLocalStorage } from "../../hooks";
import { debounce } from "lodash-es";

const MARKDOWN_KEY = "MARKDOWN_KEY";

// TODO: 文章内容自动缓存到localstorege
// TODO: 文章内容保存
// TODO: 文章导出成MarkDown
// TODO: 字数统计
const Editor: FC = () => {
  const [initialContent, setInitialContent] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [getNote, setNote] = useLocalStorage<string>(MARKDOWN_KEY);

  useEffect(() => {
    recover();
    // console.log(contentRef.current());
  }, []);

  // 自动保存到localStorage
  // const autoSave = () => {
  //   localStorage.setItem("markdown", "");
  // };

  // 从localstorage还原
  const recover = () => {
    const note = getNote();
    setInitialContent(note);
  };

  // 保存到远端
  const handleSave = () => {
    // 保存到localstorage
    setNote(initialContent || content);
  };

  return (
    <Page>
      <Navbar />
      <Container>
        <RichEditor
          dark
          value={initialContent}
          onChange={(value) => setContent(value)}
          onSave={handleSave}
          onBlur={handleSave}
        />
      </Container>
    </Page>
  );
};

export default Editor;
