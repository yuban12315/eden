import React, { FC, useEffect, useRef, useState } from "react";
import EditorView from "../../components/EditorView";
import Navbar from "../../components/Navbar";
import { Container, Page } from "../../components/Styled";
import { useGetNoteConentQuery } from "../../apollo/operation";

const Editor: FC = () => {
  const { data, error, loading } = useGetNoteConentQuery({
    variables: { id: "619fa152fa3e9e5a4b8b43cd" },
  });

  console.log(data);
  console.log(error);

  const handleChangeContent = async () => {};

  return (
    <Page>
      <Navbar />
      <Container>
        <EditorView
          content={data?.content.content ?? ""}
          onChange={handleChangeContent}
        />
      </Container>
    </Page>
  );
};

export default Editor;
