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

  img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }

  &:hover {
    cursor: pointer;
    transition: 0.2s;
    background-color: ${(props) => {
      let btnHoverColor;
      switch (props.btncolor) {
        case "var(--grass)":
          btnHoverColor = "var(--bug)";
          break;
        case "var(--water)":
          btnHoverColor = "var(--ice)";
          break;
        case "var(--poke-dex-red)":
          btnHoverColor = "var(--psychic)";
          break;
        default:
          btnHoverColor = `${props.btncolor}7f`;
      }
      return btnHoverColor;
    }};
  }
`;

export const MiddleButton = styled(NormalButton)`
  width: 50%;
  padding: 0.5rem;
`;
