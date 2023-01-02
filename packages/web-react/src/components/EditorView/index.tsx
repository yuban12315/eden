import { FC, useEffect, useState } from "react";
import RichEditor from "rich-markdown-editor";
import { useStore } from "../../store/index";
import { EditorViewContainer } from "./styled";
// TODO: switch to slate-react looks like one editor component, never mind
// TODO: editor view 组件不负责保存数据，数据保存交给外层组件

// TODO: 文章内容保存
// TODO: 文章导出成MarkDown
// TODO: 字数统计
// TODO: 点击区太小，autoFocus指针会移到最开始

interface EditorViewProps {
  content: string;
  onChange?: (value: string) => Promise<void>;
  onSave?: (value: string) => Promise<void>;
}

const EditorView: FC<EditorViewProps> = (props) => {
  // 内部维护的状态，这里不直接把content作为value传给editor组件
  // 防止光标闪动
  const [initialContent, setInitialContent] = useState<string>("");

  // 内部维护的内容状态
  const [content, setContent] = useState<string>("");
  const isDarkMode = useStore((state) => state.mode.isDarkMode);

  useEffect(() => {
    setInitialContent(props.content);
  }, [props.content]);

  // 调用父组件的保存方法
  const handleSave = async () => {
    await props.onSave?.(content || initialContent);
  };

  return (
    <EditorViewContainer dark={isDarkMode}>
      {/* 必须在有内容的时候渲染editor，此时autoFocus才能把光标移动到最后一行 */}
      {initialContent && (
        <RichEditor
          className="editor-inner"
          placeholder="写点什么吧~"
          dark={isDarkMode}
          value={initialContent}
          onChange={(value) => setContent(value)}
          onSave={handleSave}
          onBlur={handleSave}
          autoFocus
        />
      )}
    </EditorViewContainer>
  );
};

export default EditorView;
