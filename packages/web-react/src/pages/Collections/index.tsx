import Navbar from "../../components/Navbar";
import { Page, Container } from "../../components/Styled";
import { useEffect, useState } from "react";
import { Button, Space } from "@arco-design/web-react";
import { Collection } from "../../store/IndexDB/Models/Collection";
import Apis from "../../apis";
import CollectionItem from "./CollectionItem";

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  const init = async () => {
    const collections = await Apis.findCollections();
    setCollections(collections ?? []);
  };

  useEffect(() => {
    init();
  }, []);

  const renderCollections = () => {
    if (collections.length > 0) {
      return collections?.map((collection) => (
        <CollectionItem data={collection} key={collection.id} />
      ));
    }
  };

  return (
    <Page>
      <Navbar />
      <Container>{renderCollections()}</Container>
    </Page>
  );
};

export default Collections;
