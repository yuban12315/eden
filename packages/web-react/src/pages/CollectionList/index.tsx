import { Button, Space } from "@arco-design/web-react";
import { useEffect, useState } from "react";

import Apis from "../../apis";
import Navbar from "../../components/Navbar";
import { Container, Page } from "../../components/Styled";
import { Collection } from "../../store/IndexDB/Models/Collection";
import CollectionItem from "./CollectionItem";

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  const init = async () => {
    const collections = await Apis.collection.findCollections();
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
