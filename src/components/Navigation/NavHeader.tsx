import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { LogoImg, NavHeaderButton, NavHeaderUl } from "./style";
import Swal from "sweetalert2";

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
  const handleToLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <NavHeaderUl>
        <li>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <LogoImg src="image/logo/title_logo.gif" alt="피카츄" />
            포켓몬 고 트레이너
          </Link>
        </li>
        <li>
          {currentUser === null ? (
            <NavHeaderButton onClick={handleToLogin}>
              <span>로그인</span>
            </NavHeaderButton>
          ) : (
            <>
              <div>반갑습니다! {currentUser.displayName} 님!</div>
              <NavHeaderButton onClick={handleLogout}>
                <span>로그아웃</span>
              </NavHeaderButton>
            </>
          )}
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
