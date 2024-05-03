import styled from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import NavBar from "./components/Navigation/NavBar";
import LoginInput from "./components/FormInput/LoginInput";

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
        <NavBar />
        <LoginInput />
      </Container>
    </>
  );
}

export default App;
