import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Apis from "../../apis";
import Navbar from "../../components/Navbar";
import { Container, FlexDiv, Page } from "../../components/Styled";
import { Space, Collapse, Grid } from "@arco-design/web-react";
import styled from "styled-components";
import { useStore } from "../../store";
import BasicInfo from "./BasicInfo";
import NoteList from "./NoteList";

const CollectionDetail = () => {
  const { id: collectionId } = useParams();
  const setCollectionData = useStore((state) => state.setCollectionData);

  const init = async () => {
    if (collectionId) {
      const collectionRes = await Apis.collection.getCollection(collectionId);
      setCollectionData(collectionRes);
    }
  };

  useEffect(() => {
    init();
  }, [collectionId]);

  return (
    <Page>
      <Navbar />
      <DetailContainer>
        <Space direction="vertical" style={{ width: "100%" }}>
          {/* 文集 */}
          <Collapse bordered={false} defaultActiveKey="first">
            <Collapse.Item header="文集" name="first">
              <BasicInfo />
            </Collapse.Item>
          </Collapse>
          <Grid.Row gutter={8}>
            <Grid.Col xs={24} lg={14}>
              {/* 目录 */}
              <Collapse bordered={false} defaultActiveKey="first">
                <Collapse.Item header="目录" name="first">
                  <NoteList />
                </Collapse.Item>
              </Collapse>
            </Grid.Col>
            <Grid.Col xs={24} lg={10}>
              {/* 设定 */}
              <Collapse bordered={false} defaultActiveKey="first">
                <Collapse.Item header="设定" name="first">
                  <BasicInfo />
                </Collapse.Item>
              </Collapse>
            </Grid.Col>
          </Grid.Row>
          <FlexDiv></FlexDiv>
        </Space>
      </DetailContainer>
    </Page>
  );
};

const DetailContainer = styled(Container)`
  display: flex;
  align-items: baseline;
  height: calc(100vh - 120px);
  overflow: auto;
  padding-bottom: 20px;
  overflow: hidden;

  .arco-col-xs-24 {
    margin-bottom: 8px;
  }
`;

const ScrollContent = styled(FlexDiv)`
  margin-left: 8px;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

export default CollectionDetail;
