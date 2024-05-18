import styled from "styled-components";

export const FormContainer = styled.form`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
`;

export const Label = styled.label`
  width: 100%;
  padding: 1rem;
  font-size: 0.9rem;
  color: var(--normal);

  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  span {
    color: var(--poke-dex-red);
    padding: 0.2rem;
  }
`;

export const Input = styled.input`
  padding: 1rem;
  border-radius: 10px;
  border: none;
  border: 1px solid var(--normal);
`;

export const TextArea = styled.textarea`
  height: 5rem;
  resize: none;
  padding: 1rem;
  border-radius: 10px;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.div`
  padding: 1rem;
  text-shadow: var(--text-strock-3px-white);
`;

export const DropdownContainer = styled.div`
  position: relative;
  width: 30%;
`;

export const DropdownHeader = styled.div`
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid var(--normal);
  background-color: white;
  cursor: pointer;
`;

export const DropdownListContainer = styled.div`
  position: absolute;
  top: 105%;
  width: 100%;
  z-index: 1000;
`;

export const DropdownList = styled.ul`
  border: 1px solid var(--normal);
  border-radius: 10px;
  background-color: var(--light);
  max-height: 10rem;
  overflow-y: auto;
`;

export const ListItem = styled.li`
  padding: 1rem;
  background-color: white;
  cursor: pointer;
`;
