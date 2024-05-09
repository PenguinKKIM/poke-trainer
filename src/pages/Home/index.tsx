import { Link } from "react-router-dom";
import styled from "styled-components";

function Home() {
  return (
    <HomeContainer>
      <h1>포켓몬 고 트레이너 등록시스템</h1>
      <ul>
        <li>
          <Link to="login">로그인</Link>
        </li>
        <li>
          <Link to="signup">회원가입</Link>
        </li>
        <li>트레이너 등록하기</li>
      </ul>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default Home;
