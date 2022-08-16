import React from "react";
import styled from "styled-components";

const Config = () => {
  return (
    <ConfigDiv>
      <ConfigHolder>
        <Title>Config details</Title>
        <BulletList>Sheetname needs to be 'Blad1'</BulletList>
        <BulletList>
          Don't have the excel file open during translation
        </BulletList>
        <BulletList>
          Column name needs to be 'Text_SV' for translation from swedish
        </BulletList>
        <BulletList>
          Make sure that no sheets with name 'DA', 'FI', 'PL', 'NL', 'EN-US' or
          'SV' exists
        </BulletList>
      </ConfigHolder>
    </ConfigDiv>
  );
};

const ConfigDiv = styled.div`
  background-color: #f8f5f9;
  margin-bottom: 15px;
`;

const ConfigHolder = styled.div`
  margin: auto;
  width: 80vw;
  font-family: Times New Roman;
  color: #4d2a19;
  text-align: left;
  // padding-left: 65px;
  padding-bottom: 20px;
  border-bottom: 0.7px solid #8a6766;
`;

const Title = styled.h1`
  text-decoration: underline 0.7px #afa0bb;
`;

const BulletList = styled.li`
  margin: 5px;
  margin-left: 15px;
  list-style-type: circle;
`;

export default Config;
