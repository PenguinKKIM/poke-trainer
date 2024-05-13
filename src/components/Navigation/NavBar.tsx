import { NavLi, NavUl } from "./style";

function NavBar(props: { toggle: boolean }) {
  return (
    <>
      <NavUl toggle={props.toggle}>
        <NavLi>
          <img src="/image/icon/ditto_icon.png" alt="메타몽아이콘" />
          등록 트레이너 보기
        </NavLi>
        <NavLi>
          <img src="/image/icon/pika_icon.png" alt="메타몽아이콘" />
          트레이너 등록 하기
        </NavLi>
        <NavLi>
          <img src="/image/icon/success_icon.png" alt="메타몽아이콘" />
          레이드 구해요
        </NavLi>
        <NavLi>
          <img src="/image/icon/ball_icon.png" alt="메타몽아이콘" />
          포켓몬 리스트 보기
        </NavLi>
      </NavUl>
    </>
  );
}

export default NavBar;
