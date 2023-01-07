import { FC } from "react";
import { Collection } from "../../store/IndexDB/Models/Collection";
import styled from "styled-components";
import DateView from "../../components/DateView";
import DefaultCover from "../../assets/images/Elysia.png";
import { Space } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";

// TODO: 支持显示总字数

interface CollectionItemProps {
  data: Collection;
}

const CollectionItem: FC<CollectionItemProps> = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  const navigateToDetail = (id: string) => {
    navigate(`/collection/${id}`);
  };

  return (
    <ItemContainer onClick={() => navigateToDetail(data.id)}>
      <Space>
        <Title>{data.name}</Title>
        <DateView timestamp={data.createdAt} />
      </Space>
      <Content>
        <Description>{data.description || "还没有描述哦"}</Description>
        <Cover src={DefaultCover} alt="" />
      </Content>
    </ItemContainer>
  );
};

export default CollectionItem;

const ItemContainer = styled.div`
  padding: 12px;
  color: var(--color-text-1);
  background-color: var(--color-bg-2);
  transition: 0.3s all;
  cursor: pointer;

  &:hover {
    background-color: var(--color-bg-3);
  }

  & + & {
    margin-top: 24px;
  }
`;

const Title = styled.div`
  font-size: 16px;
`;

const Cover = styled.img`
  -webkit-user-drag: none;
  width: 100px;
  height: 100px;
`;

const Content = styled.div`
  margin-top: 8px;
  padding-top: 4px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--color-neutral-2);
`;

const Description = styled.div`
  color: var(--color-text-2);
`;
