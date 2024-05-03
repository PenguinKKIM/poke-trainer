import styled from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { RouterProvider } from "react-router-dom";
import Router from "./router/Router";

const Container = styled.div`
  width: 50%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
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
