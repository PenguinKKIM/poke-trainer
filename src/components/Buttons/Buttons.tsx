import styled from "styled-components";

type ButtonProps = {
  btncolor?: string;
  fontsize?: string;
  fontcolor?: string;
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
};

export const NormalButton = styled.button<ButtonProps>`
  width: 100%;
  padding: 1rem;

  border: none;
  border: 1px solid gray;
  border-radius: 10px;

  background-color: ${(props) => props.btncolor};
  font-size: ${(props) => props.fontsize};
  color: ${(props) => props.fontcolor};

  &:hover {
    cursor: pointer;
    background-color: ${(props) => {
      return `${props.btncolor}7f`;
    }};
  }
`;

export const MiddleButton = styled(NormalButton)`
  width: 50%;
`;
