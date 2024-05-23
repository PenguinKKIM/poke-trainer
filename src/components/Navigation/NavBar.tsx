import { Link } from "react-router-dom";
import { NavLi, NavUl } from "./style";

function NavBar(props: { toggle: boolean }) {
  return (
    <>
      <NavUl toggle={props.toggle}>
        <NavLi>
          <Link to="trainerlist">
            <img src="/image/icon/ditto_icon.png" alt="메타몽아이콘" />
            등록 트레이너 보기
          </Link>
        </NavLi>
        <NavLi>
          <Link to="raid">
            <img src="/image/icon/success_icon.png" alt="메타몽아이콘" />
            레이드 구해요
          </Link>
        </NavLi>
        <NavLi>
          <Link to="mypage">
            <img src="/image/icon/pika_icon.png" alt="메타몽아이콘" />
            마이 페이지
          </Link>
        </NavLi>
      </NavUl>
    </>
  );
}

export default NavBar;
