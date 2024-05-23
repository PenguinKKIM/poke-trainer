import styled from "styled-components";
import JoinInput from "../../components/FormInput/JoinInput";

function SignUpPage() {
  return (
    <FormContainer>
      <JoinInput />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: var(--color-prime);
  border-radius: 10px;
  border: 2px solid var(--water);
  @media screen and (min-width: 850px) {
    width: 60%;
  }
`;

export default SignUpPage;
