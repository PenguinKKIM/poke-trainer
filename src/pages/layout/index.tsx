import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

function Layout() {
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}
const MainContainer = styled.main`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Layout;
