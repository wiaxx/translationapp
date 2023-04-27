import React from 'react';
import styled from 'styled-components';
import Config from './Config';
import Input from './Input';

const MainDiv = styled.div`
  height: calc(100vh - 28px - 150px - 65px);
  margin: 5px;
  padding: 15px;
  background-color: #f8f5f9;
  border-radius: 8px;
`;

const Main = () => {
  return (
    <MainDiv>
      <Config />
      <Input />
    </MainDiv>
  );
};

export default Main;
