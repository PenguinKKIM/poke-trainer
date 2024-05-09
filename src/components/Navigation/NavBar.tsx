import styled from "styled-components";

type NavUl = {
  toggle: boolean;
};

const NavUl = styled.ul<NavUl>`
  display: ${(props) => (props.toggle ? "flex" : "none")};
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 700;
  position: absolute;
  top: 3.5rem;
  z-index: 1000;
  @media screen and (min-width: 850px) {
    flex-direction: row;
  }
`;

const NavLi = styled.li`
  width: 80vw;
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;

  background-color: var(--color-prime);
  padding: 0.5rem 1rem;
  border: 2px solid var(--water);
  border-radius: 10px;
  img {
    width: 30px;
    height: 30px;
  }
  &:hover {
    cursor: pointer;
    background-color: var(--list-background-color);
  }
  @media screen and (min-width: 850px) {
    width: inherit;
  }
`;

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
