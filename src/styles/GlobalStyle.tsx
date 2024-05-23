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

  --text-strock-3px-white:  rgb(233, 233, 233) 3px 0px 0px, rgb(233, 233, 233) 2.83487px 0.981584px 0px,
      rgb(233, 233, 233) 2.35766px 1.85511px 0px, rgb(233, 233, 233) 1.62091px 2.52441px 0px,
      rgb(233, 233, 233) 0.705713px 2.91581px 0px, rgb(233, 233, 233) -0.287171px 2.98622px 0px,
      rgb(233, 233, 233) -1.24844px 2.72789px 0px, rgb(233, 233, 233) -2.07227px 2.16926px 0px,
      rgb(233, 233, 233) -2.66798px 1.37182px 0px, rgb(233, 233, 233) -2.96998px 0.42336px 0px,
      rgb(233, 233, 233) -2.94502px -0.571704px 0px, rgb(233, 233, 233) -2.59586px -1.50383px 0px,
      rgb(233, 233, 233) -1.96093px -2.27041px 0px, rgb(233, 233, 233) -1.11013px -2.78704px 0px,
      rgb(233, 233, 233) -0.137119px -2.99686px 0px, rgb(233, 233, 233) 0.850987px -2.87677px 0px,
      rgb(233, 233, 233) 1.74541px -2.43999px 0px, rgb(233, 233, 233) 2.44769px -1.73459px 0px,
      rgb(233, 233, 233) 2.88051px -0.838247px 0px;
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
button{
  font-family: "Galmuri";
}
`;
