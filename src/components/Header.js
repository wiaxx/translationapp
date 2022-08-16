import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderDiv>
      <Title>Translate</Title>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  background-color: #afa0bb;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 3px lightgrey;
`;

const Title = styled.h1`
  color: white;
  text-transform: uppercase;
  // text-decoration: underline wavy #f8f5f9;
  font-family: GillSans, Calibri, Trebuchet, sans-serif;
  font-size: 2.5rem;
`;

export default Header;
