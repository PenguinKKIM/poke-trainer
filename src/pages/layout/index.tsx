import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </>
  );
}
const MainContainer = styled.main`
  margin-top: 1rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Layout;
