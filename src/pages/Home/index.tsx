import { Link } from "react-router-dom";
import styled from "styled-components";
import { NavLi } from "../../components/Navigation/style";

function Home() {
  return (
    <HomeContainer>
      <HomeTitle>
        <img src="/image/logo/title_logo.gif" alt="" />포켓몬 트레이너</HomeTitle>
      <HomeUl>
        <NavLi>
          <Link to="trainerlist">트레이너 리스트 보기</Link>
        </NavLi>
        <NavLi>
          <Link to="raid">레이드/체육관 모집 글 보기</Link>
        </NavLi>
        <NavLi>
          <Link to="mypage">
            마이 페이지
          </Link>
        </NavLi>
      </HomeUl>
    </HomeContainer>
  );
}
const HomeTitle = styled.h1`
  font-size: 1.5rem;
  background-color: aliceblue;
  padding: 1rem;
  border-radius: 10px;
  border: 2px solid var(--water);
  display: flex;
  align-items: center;
  gap: 2rem;
  img{
    width:5rem;
  }
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
