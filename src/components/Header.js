import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
  background-color: #afa0bb;
  height: 150px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const Title = styled.h1`
  color: white;
  font-family: Roboto;
  font-size: 2.5rem;
`;

const Header = () => {
  return (
    <HeaderDiv>
      <Title>Bangerhead x DeepL</Title>
    </HeaderDiv>
  );
};

export default Header;
