import { Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";
import { useState } from "react";

const NavHeaderUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--poke-dex-red);
  padding: 0.5rem 1rem;
  position: relative;

  li a {
    text-shadow: rgb(233, 233, 233) 3px 0px 0px, rgb(233, 233, 233) 2.83487px 0.981584px 0px,
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
`;

const LogoImg = styled.img`
  background-color: white;
  padding: 0.2rem;
  width: 30px;
  height: 30px;
  margin-right: 1rem;
  border-radius: 10px;
  border: 2px solid var(--water);
`;

const NavHeaderButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 30px;
    height: 30px;
  }
`;

function NavHeader() {
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <>
      <NavHeaderUl>
        <li>
          <Link to="/">
            <LogoImg src="image/logo/title_logo.gif" alt="피카츄" />
            포켓몬 고 트레이너
          </Link>
        </li>
        <li>
          <NavHeaderButton onClick={toggleNav}>
            <img src="/image/icon/ball.png" alt="네비 버튼 이미지" />
          </NavHeaderButton>
        </li>
        <NavBar toggle={showNav} />
      </NavHeaderUl>
    </>
  );
}

export default NavHeader;
