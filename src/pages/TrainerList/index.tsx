import styled from "styled-components";
import TrainerList from "../../components/TrainerList/TrainerList";

function TrainerListPage() {
  return <FormContainer>
    <TrainerList />
  </FormContainer>;
}

const FormContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-prime);
  border-radius: 10px;
  border: 2px solid var(--water);
  @media screen and (min-width: 850px) {
    width: 60%;
    padding: 2rem;
  }
`;


export default TrainerListPage;