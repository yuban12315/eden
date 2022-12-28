import Navbar from "../../components/Navbar";
import { Page, Container } from "../../components/Styled";
import CollectionModel from "../../store/IndexDB/Models/Collection";
import { useEffect } from "react";

const Collections = () => {
  useEffect(() => {
    CollectionModel.add({
      id: "11",
      name: "test",
      creator: { id: "yuban12315", name: "yuban12315", avatar: "" },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }, []);

  return (
    <Page>
      <Navbar />
      <Container>111</Container>
    </Page>
  );
};

export default Collections;
