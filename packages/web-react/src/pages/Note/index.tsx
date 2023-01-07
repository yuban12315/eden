import { FC, useEffect, useState } from "react";
import EditorView from "../../components/EditorView";
import Navbar from "../../components/Navbar";
import { Container, Page } from "../../components/Styled";
import { Message } from "@arco-design/web-react";
import { useParams } from "react-router-dom";
import Apis from "../../apis";
import { debounce } from "lodash";

const Editor: FC = () => {
  const [content, setContent] = useState<string>();

  const { id: noteId } = useParams();

  const init = async () => {
    if (noteId) {
      const res = await Apis.note.getNote(noteId);
      setContent(res.content);
    }
  };

  useEffect(() => {
    init();
  }, [noteId]);

  const handleChangeContent = debounce(async (content: string) => {
    if (!noteId) {
      return;
    }
    await Apis.note.updateNote(noteId, { content });
    Message.success({ content: "已保存", position: "bottom" });
  }, 1000);

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
