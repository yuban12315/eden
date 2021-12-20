import React, { FC, useEffect, useRef, useState } from "react";
import RichEditor from "rich-markdown-editor";
import Navbar from "../../components/Navbar";
import { Container, Page } from "../../components/Styled";
import { useLocalStorage } from "../../hooks";
import { useStore } from "../../store/index";

const MARKDOWN_KEY = "MARKDOWN_KEY";

// TODO: 文章内容保存
// TODO: 文章导出成MarkDown
// TODO: 字数统计
// TODO: 点击区太小，autoFocus指针会移到最开始
const Editor: FC = () => {
  const [initialContent, setInitialContent] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [getNote, setNote] = useLocalStorage<string>(MARKDOWN_KEY);
  const isDarkMode = useStore((state) => state.mode.isDarkMode);

  useEffect(() => {
    recover();
  }, []);

  // 自动保存到localStorage
  // const autoSave = () => {
  //   localStorage.setItem("markdown", "");
  // };

  // 从localStorage或远端还原
  const recover = () => {
    const note = getNote();

    setInitialContent(note);
  };

  // 保存到远端
  const handleSave = () => {
    // 保存到localStorage
    setNote(content || initialContent);
  };

  // 按下ctrl+s或command+s时调用保存
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
      // props.handleSave && props.handleSave(value);
      event.preventDefault();

      // TODO: remove test log when api called
      console.log("should save code");
    }
  };

  return (
    <Page>
      <Navbar />
      <Container>
        <RichEditor
          dark={isDarkMode}
          autoFocus
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
