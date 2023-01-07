import { Fragment, useCallback, useEffect, useState } from "react";
import Apis from "../../apis";
import { useStore } from "../../store";
import styled from "styled-components";
import { Space, Button, List, Collapse } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";
import type { Note } from "../../store/IndexDB/Models/Note";
import { IconFile } from "@arco-design/web-react/icon";
import DateView from "../../components/DateView";
import { FlexDiv, Info } from "../../components/Styled";

export default function NoteList() {
  const collectionId = useStore((state) => state.collectionData)?.id;
  const [createLoading, setCreateLoading] = useState(false);
  const navigate = useNavigate();

  const [notes, setNotes] = useState<Note[]>();

  const init = useCallback(async () => {
    if (!collectionId) {
      return;
    }
    const noteRes = await Apis.note.findNotes(collectionId);
    setNotes(noteRes);
  }, [collectionId]);

  useEffect(() => {
    init();
  }, [collectionId, init]);

  // 创建后跳转到新的编辑页面
  const handleCreateNote = async () => {
    setCreateLoading(true);

    const res = await Apis.note.createNote({
      title: "Untitled",
      content: "",
      collectionId: collectionId!,
    });

    navigate(`/note/${res.id}`);
  };

  const handleClickNoteTitle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    navigate(`/note/${id}`);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <ToolBar>
        <div>TODO</div>
        {/* TODO: 支持切换排序方式，支持搜索 */}
        <Button
          type="outline"
          status="success"
          loading={createLoading}
          onClick={handleCreateNote}
        >
          新建章节
        </Button>
      </ToolBar>

      <NoteCollapse accordion>
        {notes?.map((note) => (
          <NoteCollapse.Item
            name={note.id}
            header={
              <NoteItemHeader>
                <Space>
                  <IconFile />
                  <NoteTitle
                    onClick={(e) => {
                      handleClickNoteTitle(e, note.id);
                    }}
                  >
                    {note.title}
                  </NoteTitle>
                </Space>
                <Space>
                  <Info>最后更新于</Info>
                  <DateView timestamp={note.updatedAt} />
                </Space>
              </NoteItemHeader>
            }
            showExpandIcon={false}
          ></NoteCollapse.Item>
        ))}
      </NoteCollapse>
    </Space>
  );
}

const ToolBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const NoteCollapse = styled(Collapse)`
  .arco-collapse-item-header {
    background-color: transparent;
  }

  .arco-collapse-item-header-title {
    width: 100%;
  }
`;

const NoteTitle = styled.div`
  padding: 4px 12px;
  justify-content: space-between;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-neutral-2);
  }
`;

const NoteItemHeader = styled(FlexDiv)`
  justify-content: space-between;
`;
