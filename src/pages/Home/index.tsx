import { Link } from "react-router-dom";
import styled from "styled-components";
import { NavLi } from "../../components/Navigation/style";

function Home() {
  return (
    <HomeContainer>
      <HomeTitle>포켓몬 고 트레이너 등록시스템</HomeTitle>
      <HomeUl>
        <NavLi>
          <Link to="trainerlist">트레이너 리스트 보기</Link>
        </NavLi>
        <NavLi>
          <Link to="raid">레이드/체육관 모집 글 보기</Link>
        </NavLi>
        <NavLi>트레이너 등록하기</NavLi>
      </HomeUl>
    </HomeContainer>
  );
}
const HomeTitle = styled.h1`
  font-size: 1.5rem;
`;
const HomeUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default Home;
