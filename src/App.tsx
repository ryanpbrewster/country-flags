import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { CountryFlag } from "./assets";
import { COUNTRY_DATA, getCountryCodes, Mode, MODES } from "./codes";
import { mod } from "./utils";

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("all");
  const codes = useMemo(() => getCountryCodes(mode), [mode]);
  const [idx, setIdx] = useState<number>(0);
  useEffect(() => {
    return window.addEventListener("keydown", (evt) => {
      console.log(evt.key);
      switch (evt.key) {
        case "ArrowUp":
          setMode((cur) => MODES[mod(MODES.indexOf(cur) - 1, MODES.length)]);
          break;
        case "ArrowDown":
          setMode((cur) => MODES[mod(MODES.indexOf(cur) + 1, MODES.length)]);
          break;
        case "ArrowRight":
          setIdx((cur) => cur + 1);
          break;
        case "ArrowLeft":
          setIdx((cur) => cur - 1);
          break;
      }
    });
  }, []);
  console.log(`${mode} -> ${codes.length}`);
  const code = codes[mod(idx, codes.length)];
  return (
    <AppWrapper>
      <p>{mode}</p>
      <CountryFlag code={code} />
      <p>{code}</p>
      <p>
        {COUNTRY_DATA[code]?.name} @ {COUNTRY_DATA[code]?.population}
      </p>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px;
`;

export default App;
