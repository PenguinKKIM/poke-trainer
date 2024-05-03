import styled from "styled-components";

const NavUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 700;
`;

const NavLi = styled.li`
  background-color: aliceblue;
  padding: 0.5rem 1rem;
  border-radius: 10px;
`;

function NavBar() {
  return (
    <>
      <NavUl>
        <NavLi>등록 트레이너 보기</NavLi>
        <NavLi>트레이너 등록 하기</NavLi>
        <NavLi>레이드 구해요</NavLi>
        <NavLi>포켓몬 리스트 보기</NavLi>
      </NavUl>
    </>
  );
}

export default NavBar;
