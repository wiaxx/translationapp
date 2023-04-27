import React, { useState } from 'react';
import styled from 'styled-components';

const InputHolder = styled.div`
  margin: 10px auto;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  width: 500px;
  padding-bottom: 10px;
`;

const InputField = styled.input`
  height: 30px;
  padding: 4px;
  margin: 2px;
  border-radius: 5px;
  border: 1px solid #afa0bb;
  text-align-last: center;
  cursor: pointer;
`;

const Selections = styled.select`
  height: 30px;
  padding: 4px;
  margin: 2px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #afa0bb;
`;

const OKButton = styled.button`
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #afa0bb;
  background-color: white;
  margin: 2px;
  &:hover,
  &:focus {
    background-color: #afa0bb;
    color: white;
  }
  &:active {
    color: black;
  }
`;

const Input = () => {
  // const [inputValue, setInputValue] = useState('/Users/jasonwikstrom/Desktop/testing.xlsx');
  const [inputValue, setInputValue] = useState('');
  const [isoValue, setIsoValue] = useState('DA');
  const [statusMessage, setStatusMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getTranslations = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage();

    if (inputValue.trim() === '') {
      alert('Please enter a filepath');
      setInputValue('');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        body: JSON.stringify({ path: inputValue, iso: isoValue }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const message = response;
      setIsLoading(false);
      setStatusMessage(message.status);
    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  };

  return (
    <InputHolder>
      <form onSubmit={getTranslations}>
        <InputField
          type="file"
          placeholder="excel-file path"
          onChange={(e) => setInputValue(e.target.files[0].path)}
        />
        <Selections
          id="lang"
          name="lang"
          value={isoValue}
          onChange={(e) => setIsoValue(e.target.value)}
        >
          <option value="DA">Danska</option>
          <option value="EN-US">Engelska</option>
          <option value="FI">Finska</option>
          <option value="FR">Franska</option>
          <option value="NL">Holländska</option>
          <option value="NB">Norska</option>
          <option value="PL">Polska</option>
          <option value="SV">Svenska</option>
        </Selections>
        <OKButton>OK</OKButton>
      </form>

      {isLoading ? <pre>Loading...</pre> : null}
      {statusMessage ? (
        statusMessage >= 200 && statusMessage < 300 ? (
          <pre>Went well</pre>
        ) : (
          <pre>Someting went wrong</pre>
        )
      ) : null}
    </InputHolder>
  );
};

export default Input;
