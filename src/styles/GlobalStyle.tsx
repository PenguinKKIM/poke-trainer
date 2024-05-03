import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset}

:root{
  --color-prime : #c1eeff;
  --color-blue :#0000ff;
}
`;
