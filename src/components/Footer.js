import React from "react";
import styled from "styled-components";

const Footer = () => {
  return <FooterDiv>Bangerhead 2022 / wiaxx</FooterDiv>;
};

const FooterDiv = styled.div`
  background-color: #afa0bb;
  height: 12.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -3px -3px 3px lightgrey;
  color: white;
`;

export default Footer;
