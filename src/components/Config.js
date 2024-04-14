import React from 'react';
import styled from 'styled-components';

const ConfigHolder = styled.div`
  margin: auto;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  width: 500px;
  text-align: left;
  padding-bottom: 10px;

  & > details > summary {
    text-align: center;
    margin-bottom: 15px;
    cursor: pointer;

    &::marker {
      color: pink;
    }
  }
`;

const Title = styled.h2`
  text-transform: uppercase;
  margin: 0;
  text-align: center;
  display: inline-block;
`;

const BulletList = styled.li`
  margin: 5px;
  margin-left: 15px;
  line-height: 1.4;
  list-style-type: circle;
`;

const Config = () => {
  return (
    <ConfigHolder>
      <details>
        <summary>
          <Title>Config details</Title>
        </summary>
        <BulletList>
          The text to translate need to be in the first sheet in workbook
        </BulletList>
        <BulletList>
          Don't have the excel file open during translation
        </BulletList>
        <BulletList>
          Column name needs to be 'Text_SV' for translation from swedish
        </BulletList>
        <BulletList>
          Make sure that no sheets with name in following list exists: <br></br>
          'DA', 'EN-US', 'FI', 'FR', 'EL', 'NL', 'IT', 'NB', 'PL', 'PT-PT', 'ES', 'SV', 'DE', 'HU' 
        </BulletList>
      </details>
    </ConfigHolder>
  );
};

export default Config;
