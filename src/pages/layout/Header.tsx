import styled from "styled-components";
import NavHeader from "../../components/Navigation/NavHeader";

function Header() {
  return (
    <HeaderContainer>
      <NavHeader />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  margin-bottom: 3rem;
`;

export default Header;
