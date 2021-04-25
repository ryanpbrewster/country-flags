import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CountryFlag } from "./assets";
import { COUNTRY_CODES } from "./codes";

const App: React.FC = () => {
  const [idx, setIdx] = useState<number>(0);
  useEffect(() => {
    return window.addEventListener("keydown", (evt) => {
      switch (evt.key) {
        case "ArrowRight":
          setIdx((cur) => (cur + 1) % COUNTRY_CODES.length);
          break;
        case "ArrowLeft":
          setIdx(
            (cur) => (cur + COUNTRY_CODES.length - 1) % COUNTRY_CODES.length
          );
          break;
      }
      console.log(evt.key);
    });
  }, []);
  return (
    <AppWrapper>
      <CountryFlag code={COUNTRY_CODES[idx]} />
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 24px;
`;

export default App;
