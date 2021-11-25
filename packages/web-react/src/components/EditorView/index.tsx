import React, { FC, useEffect, useState } from "react";
import RichEditor from "rich-markdown-editor";
import { useLocalStorage } from "../../hooks";
import { useStore } from "../../store/index";

const MARKDOWN_KEY = "MARKDOWN_KEY";

// TODO: 文章内容保存
// TODO: 文章导出成MarkDown
// TODO: 字数统计
const EditorView: FC = () => {
  const [initialContent, setInitialContent] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [getNote, setNote] = useLocalStorage<string>(MARKDOWN_KEY);
  const isDarkMode = useStore((state) => state.mode.isDarkMode);

  useEffect(() => {
    recover();
  }, []);

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

  return (
    <RichEditor
      dark={isDarkMode}
      autoFocus
      value={initialContent}
      onChange={(value) => setContent(value)}
      onSave={handleSave}
      onBlur={handleSave}
    />
  );
};

export default EditorView;
