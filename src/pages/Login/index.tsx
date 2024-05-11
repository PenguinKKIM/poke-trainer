import { Link } from "react-router-dom";
import LoginInput from "../../components/FormInput/LoginInput";
import styled from "styled-components";

function LoginPage() {
  return (
    <FormContainer>
      <span>로그인</span>
      <LoginInput />
      회원 가입 안하셨나요 ? <Link to="/">회원가입 하러가기</Link>
    </FormContainer>
  );
}
const FormContainer = styled.div`
  width: 80%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-prime);
  border-radius: 10px;
  border: 2px solid var(--water);
  @media screen and (min-width: 850px) {
    width: 60%;
  }
`;
export default LoginPage;
