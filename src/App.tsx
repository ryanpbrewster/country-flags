import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { CountryFlag } from "./assets";
import { COUNTRY_DATA, getCountryCodes, Mode, MODES } from "./codes";
import { mod } from "./utils";

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("all");
  const [hidden, setHidden] = useState<boolean>(true);
  const codes = useMemo(() => getCountryCodes(mode), [mode]);
  const [idx, setIdx] = useState<number>(0);

  useEffect(() => {
    const keydown = (evt: any) => {
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
        case " ":
          setIdx(Math.floor(Math.random() * codes.length));
          break;
        case "r":
          setHidden(false);
          break;
      }
    };
    const keyup = (evt: any) => {
      switch (evt.key) {
        case "r":
          setHidden(true);
          break;
      }
    };
    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);
    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
    };
  }, [codes.length]);
  const code = codes[mod(idx, codes.length)];
  const info = (
    <>
      <p>{code}</p>
      <p>
        {COUNTRY_DATA[code]?.name} @ {COUNTRY_DATA[code]?.population}
      </p>
    </>
  );
  return (
    <AppWrapper>
      <p>{mode}</p>
      <button
        onMouseDown={() => setHidden(false)}
        onMouseUp={() => setHidden(true)}
      >
        Reveal
      </button>
      <CountryFlag code={code} />
      {hidden === true ? null : info}
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
