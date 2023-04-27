import React, { useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

const LoadingDiv = styled.div`
  width: 80%;
  border-radius: 8px;
  margin: 25px auto 0 auto;
  padding: 10px;
`;

const MessageText = styled.div`
  width: 80%;
  border-radius: 8px;
  margin: 25px auto 0 auto;
  padding: 10px;
  background-color: #bdebba;
  color: #003700;
  font-weight: bold;
`;

const ErrorTest = styled.div`
  width: 80%;
  border-radius: 8px;
  margin: 25px auto 0 auto;
  padding: 10px;
  background-color: #ff2536;
  color: white;
  font-weight: bold;
`;

const Input = () => {
  const [inputValue, setInputValue] = useState('');
  const [isoValue, setIsoValue] = useState('');
  const [statusCode, setStatusCode] = useState();
  const [responseMessage, setResponseMessage] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getTranslations = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusCode();
    setResponseMessage();
    setError();
    setResponseMessage();

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
      const data = response;
      const { message, error } = await data.json();

      setStatusCode(data.status);
      setResponseMessage(message);
      setError(error);
      setIsLoading(false);
    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  };

  return (
    <InputHolder>
      <form onSubmit={getTranslations}>
        <InputField
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          placeholder="excel-file path"
          onChange={(e) => setInputValue(e.target.files[0].path)}
        />
        <Selections
          id="lang"
          name="lang"
          value={isoValue}
          onChange={(e) => setIsoValue(e.target.value)}
          required
        >
          <option disabled value="">
            -- select an option --
          </option>
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

      {isLoading ? (
        <LoadingDiv>
          <Skeleton height="2rem" />
        </LoadingDiv>
      ) : null}
      {responseMessage ? <MessageText>{responseMessage}</MessageText> : null}
      {error ? <ErrorTest>{error}</ErrorTest> : null}
    </InputHolder>
  );
};

export default Input;
