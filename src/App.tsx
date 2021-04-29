import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { CountryFlag } from "./assets";
import { COUNTRY_DATA, getCountryCodes } from "./codes";
import { mod } from "./utils";

const App: React.FC = () => {
  const [areaLimit, setAreaLimit] = useState<number>(0);
  const [populationLimit, setPopulationLimit] = useState<number>(0);
  const [hidden, setHidden] = useState<boolean>(true);
  const codes = useMemo(() => getCountryCodes({ areaLimit, populationLimit }), [
    areaLimit,
    populationLimit,
  ]);
  const [idx, setIdx] = useState<number>(0);

  useEffect(() => {
    const keydown = (evt: any) => {
      switch (evt.key) {
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
  return (
    <AppWrapper>
      <AppHeader>
        Filters:
        <input
          value={areaLimit || undefined}
          onChange={(evt) => setAreaLimit(Number(evt.target.value))}
          placeholder="Area [thousand km^2]"
        />
        <input
          value={populationLimit || undefined}
          onChange={(evt) => setPopulationLimit(Number(evt.target.value))}
          placeholder="Population [millions]"
        />
      </AppHeader>
      <button
        onMouseDown={() => setHidden(false)}
        onMouseUp={() => setHidden(true)}
      >
        Reveal
      </button>
      <CountryFlag code={code} />
      <CountryInfo hide={hidden}>
        <p>{code}</p>
        <p>
          {COUNTRY_DATA[code]?.name}: {COUNTRY_DATA[code]?.population} million
          people
        </p>
        <p>{COUNTRY_DATA[code]?.area} thousand square kilometers</p>
      </CountryInfo>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px;
`;

const AppHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px;
`;

const CountryInfo = styled.div<{ hide: boolean }>`
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  transition: all 2s ease-out;
`;

export default App;
