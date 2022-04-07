import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterDiv>
            Footer
        </FooterDiv>
    )
}

const FooterDiv = styled.div`
    background-color: #AFA0BB;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -3px -3px 3px lightgrey;
    color: white;
`;

export default Footer;