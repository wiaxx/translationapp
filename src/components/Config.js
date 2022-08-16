import React from "react";
import styled from "styled-components";

const Config = () => {
  return (
    <ConfigDiv>
      <Title>Config details</Title>
      <BulletList>Sheetname needs to be 'Blad1'</BulletList>
      <BulletList>Don't have the excel file open during translation</BulletList>
      <BulletList>
        Column name needs to be 'Text_SV' for translation from swedish
      </BulletList>
      <BulletList>
        Make sure that no sheets with name 'DA', 'FI', 'PL', 'NL', 'EN-US' or
        'SV' exists
      </BulletList>
    </ConfigDiv>
  );
};

const ConfigDiv = styled.div`
  // text-align: left;
  background-color: #f8f5f9;
  padding-bottom: 15px;
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
