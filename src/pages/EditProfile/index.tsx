import styled from "styled-components";
import EditProfile from "../../components/Mypage/EditProfile";

function EditProfilePage() {
  return (
    <FormContainer>
      <EditProfile />
    </FormContainer>
  )
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

export default EditProfilePage;