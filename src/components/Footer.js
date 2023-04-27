import React from 'react';
import styled from 'styled-components';

const FooterDiv = styled.div`
  background-color: #afa0bb;
  height: 65px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: white;
`;

const Footer = () => {
  return <FooterDiv>Bangerhead {new Date().getFullYear()} / @wiaxx</FooterDiv>;
};

export default Footer;
