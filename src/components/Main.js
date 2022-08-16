import React from "react";
import styled from "styled-components";
import Config from "./Config";
import Input from "./Input";

const Main = () => {
  return (
    <MainDiv>
      <Config />
      <Input />
    </MainDiv>
  );
};

const MainDiv = styled.div`
  height: 55vh;
  background-color: #f8f5f9;
`;

export default Main;
