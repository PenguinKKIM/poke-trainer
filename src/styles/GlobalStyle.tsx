import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Galmuri11Bold from "../fonts/Galmuri11-Bold.ttf";

export const GlobalStyle = createGlobalStyle`
${reset}
@font-face {
    font-family: "Galmuri";
    src: url(${Galmuri11Bold});
    font-weight: bold;
    font-style: normal;
  }
:root{
  --color-prime : #f0f8ff;
  
  --button-color--normal: #c1eeff;
  --button-color--hover: #f0f8ff;

  --font-color--black: #333;
  --font-size--small: 0.7rem;
  --font-size--big: 1.2rem;
  --font-weight--bold: 600;

  --flex-grow-max-item: 28rem;
  --flex-gap--big: 1rem;
  --flex-gap--small: 0.5rem;

  --border-radius--normal: 10px;
  --border-radius--small: 5px;

  --water: #5185c5;
  --dragon: #535ca8;
  --grass: #66a945;
  --ghost: #684870;
  --steel: #69a9c7;
  --ice: #6dc8eb;
  --poison: #735198;
  --normal: #949495;
  --ground: #9c7743;
  --bug: #9fa244;
  --flying: #a2c3e7;
  --rock: #bfb889;
  --fairy: #dab4d4;
  --psychic: #dd6b7b;
  --fighting: #e09c40;
  --fire: #e56c3e;
  --electric: #f6d851;
  --poke-dex-red: #d60000;
  --list-background-color: #fcfcfc;

  --mobile-width: 90%;
}
a{
  text-decoration: none;
  color: inherit;
}
body{
  font-family: "Galmuri";
  font-weight: 500;
  color: #333333;
}
`;
