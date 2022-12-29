import Navbar from "../../components/Navbar";
import { Page, Container } from "../../components/Styled";
import CollectionModel from "../../store/IndexDB/Models/Collection";
import { useEffect } from "react";
import { Button } from "@arco-design/web-react";

const Collections = () => {
  useEffect(() => {}, []);

  const onClick = () => {
    CollectionModel.add({
      id: Math.random().toString(),
      name: "test",
      creator: { id: "yuban12315", name: "yuban12315", avatar: "" },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <Page>
      <Navbar />
      <Container>
        <Button onClick={onClick}>click here</Button>
      </Container>
    </Page>
  );
};

export default Collections;
