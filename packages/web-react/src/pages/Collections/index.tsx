import Navbar from "../../components/Navbar";
import { Page, Container } from "../../components/Styled";
import { useEffect, useState } from "react";
import { Button, Space } from "@arco-design/web-react";
import CollectionModel from "../../store/IndexDB/Models/Collection";
import { Collection } from "../../store/IndexDB/Models/Collection";

const Collections = () => {
  const [collection, setCollection] = useState<Collection>();
  useEffect(() => {}, []);

  const onClick = async () => {
    const data = await CollectionModel.add({
      name: "test",
      // creator: { id: "yuban12315", name: "yuban12315", avatar: "" },
      authorId: "11",
    });
    setCollection(data);
  };

  const deleteCollection = async () => {
    if (collection?.id) {
      await CollectionModel.delete(collection.id);
      setCollection(undefined);
    }
  };

  const updateCollection = async () => {
    if (collection?.id) {
      const newCollection = await CollectionModel.update(collection.id, {
        name: Math.random().toString() + "---data--" + collection.name,
      });

      setCollection(newCollection);
    }
  };

  return (
    <Page>
      <Navbar />
      <Container>
        <Space>
          <Button onClick={onClick}>add a connection</Button>
          <Button onClick={deleteCollection}>
            delete Connection: {collection?.id || "empty"}
          </Button>
          <Button onClick={updateCollection}>update collection</Button>
        </Space>
        {JSON.stringify(collection, null, 2)}
      </Container>
    </Page>
  );
};

export default Collections;
