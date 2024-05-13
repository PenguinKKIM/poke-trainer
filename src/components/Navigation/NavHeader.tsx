import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import { auth } from "../../firebase";
import { LogoImg, NavHeaderButton, NavHeaderUl } from "./style";

const currentUser = auth.currentUser;

const handleLogout = () => {
  auth.signOut();
};

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
          {
            currentUser === null ? <NavHeaderButton><Link to="/login">로그인</Link></NavHeaderButton> :
              <NavHeaderButton onClick={handleLogout}>로그아웃</NavHeaderButton>
          }
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
