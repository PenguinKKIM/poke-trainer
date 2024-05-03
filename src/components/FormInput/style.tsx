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
  color: gray;

  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const Input = styled.input`
  padding: 1rem;
  border-radius: 10px;
  border: none;
  border: 1px solid gray;
`;
