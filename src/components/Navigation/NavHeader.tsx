import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { DisplayNameConatiner, LogoImg, NavHeaderButton, NavHeaderLi, NavHeaderUl } from "./style";
import Swal from "sweetalert2";
import { HandleNav } from "../Buttons/HandleNav";

function NavHeader() {
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(false);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const handleLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    Swal.fire({
      html: "<p> 로그아웃 하시겠습니까? </p>",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOut();
        navigate("/");
      }
    });
  };

  return (
    <>
      <NavHeaderUl>
        <NavHeaderLi>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <LogoImg src="image/logo/title_logo.gif" alt="피카츄" />
            포켓몬 트레이너
          </Link>
        </NavHeaderLi>
        <NavHeaderLi>
          {currentUser === null ? (
            <>
              <NavHeaderButton onClick={HandleNav(navigate, "/login")}>
                <span>로그인</span>
              </NavHeaderButton>
              <NavHeaderButton onClick={HandleNav(navigate, "/signup")}>
                <span>회원가입</span>
              </NavHeaderButton>
            </>
          ) : (
            <DisplayNameConatiner>
              <div>반갑습니다! {currentUser.displayName} 님!</div>
              <NavHeaderButton onClick={handleLogout}>
                <span>로그아웃</span>
              </NavHeaderButton>
            </DisplayNameConatiner>
          )}
          <NavHeaderButton onClick={toggleNav}>
            <img src="/image/icon/ball.png" alt="네비 버튼 이미지" />
          </NavHeaderButton>
        </NavHeaderLi>
        <NavBar toggle={showNav} />
      </NavHeaderUl>
    </>
  );
}

export default NavHeader;
