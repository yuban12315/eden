import { Typography } from "@arco-design/web-react";
import { debounce } from "lodash";
import { Fragment, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Apis from "../../apis";
import { Collection } from "../../store/IndexDB/Models/Collection";
import { useStore } from "../../store/zustand";

export default function BasicInfo() {
  const collectionData = useStore((state) => state.collectionData);
  const setCollectionData = useStore((state) => state.setCollectionData);

  const [data, setData] = useState<Collection>();

  useEffect(() => {
    if (collectionData) {
      setData(collectionData);
    }
  }, [collectionData]);

  const updateCollectionInfo = useCallback(
    debounce(async (_data: Collection) => {
      if (!collectionData?.id) {
        return;
      }

      const res = await Apis.collection.updateCollection(
        collectionData?.id,
        _data
      );
      setCollectionData(res);
    }, 1000),
    [collectionData?.id]
  );

  const handleChangeInfo = (key: "name" | "description", value: string) => {
    if (!data) {
      return;
    }

    const newData = { ...data, [key]: value };
    setData(newData);
    updateCollectionInfo(newData);
  };

  return (
    <Fragment>
      <StyledTypography size={18}>
        <Typography.Paragraph
          editable={{
            onChange: (text: string) => handleChangeInfo("name", text),
          }}
        >
          {data?.name}
        </Typography.Paragraph>
      </StyledTypography>
      <StyledTypography>
        <Typography.Paragraph
          editable={{
            onChange: (text: string) => handleChangeInfo("description", text),
          }}
        >
          {data?.description || "还没有描述哦"}
        </Typography.Paragraph>
      </StyledTypography>
    </Fragment>
  );
}

const StyledTypography = styled(Typography)<{ size?: number }>`
  font-size: ${(props) => props.size || "14"}px;

  .arco-textarea {
    min-height: 1.5715em;
    font-size: inherit;
  }

  .arco-typography-operation-edit {
    opacity: 0;
    transition: 0.3s all;
  }

  .arco-typography {
    &:hover {
      .arco-typography-operation-edit {
        opacity: 1;
      }
    }
  }
`;
