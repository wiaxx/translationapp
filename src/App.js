import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { api } from "./api";

const App = () => {
  const [successText, setSuccessText] = useState(null);

  useEffect(() => {
    api
      .get("/")
      .then(({ data }) => setSuccessText(data))
      .catch((err) => console.error(err));
  });

  return (
    <div className="App">
      <Header />
      <Main />
      <p>{successText}</p>
      <Footer />
    </div>
  );
};

export default App;
