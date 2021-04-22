import React from "react";
import styled from "styled-components";
import { CountryFlag } from "./assets";

const App: React.FC = () => {
  return (
    <AppWrapper>
      <CountryFlag />
      <p>Hello, World!</p>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default App;
