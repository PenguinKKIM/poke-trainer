import styled from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { RouterProvider } from "react-router-dom";
import Router from "./router/Router";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url("/image/background/all_bg.png");
  background-position: center;
  background-size: cover;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <RouterProvider router={Router} />
      </Container>
    </>
  );
}

export default App;
