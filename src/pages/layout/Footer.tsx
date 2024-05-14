import { Link } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <div>
        더 알고 싶으신가요?
        <br />
        문의사항은 <Link to="clfrck@naver.com">clfrck@naver.com</Link>으로 보내주세요.
        <br />
        포켓몬 트레이너 관리 시스템 ©2024. <br />
        <Link to="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons">
          Pokemon icons created by Darius Dan - Flaticon
        </Link>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--poke-dex-red);
  margin-top: auto;
  div {
    line-height: 1rem;
    padding: 1rem;
    font-size: 0.7rem;
  }
`;

export default Footer;
