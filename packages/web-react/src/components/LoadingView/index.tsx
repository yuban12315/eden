import React, { FC } from 'react';
import { Spin } from '@arco-design/web-react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  display: flex;
`;

// interface LoadingProps {}
const LoadingView: FC = () => {
  return (
    <Container>
      <Spin loading size={20} dot></Spin>
    </Container>
  );
};

export default LoadingView;
