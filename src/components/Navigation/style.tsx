import styled from "styled-components";

interface NavUl {
  toggle: boolean;
}

export const NavUl = styled.ul<NavUl>`
  display: ${(props) => (props.toggle ? "flex" : "none")};
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 700;
  position: absolute;
  top: 4rem;
  z-index: 1000;
  @media screen and (min-width: 850px) {
    flex-direction: row;
  }
`;

export const NavLi = styled.li`
  width: 80vw;
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;

  background-color: var(--color-prime);
  padding: 0.5rem 1rem;
  border: 2px solid var(--water);
  border-radius: 10px;
  img {
    width: 30px;
    height: 30px;
  }
  &:hover {
    cursor: pointer;
    background-color: var(--list-background-color);
  }
  @media screen and (min-width: 850px) {
    width: inherit;
  }
`;

export const NavHeaderUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--poke-dex-red);
  padding: 0.5rem 1rem;
  position: relative;
  li {
    display: flex;
  }
  li a {
    text-shadow: var(--text-strock-3px-white);
  }
`;

export const LogoImg = styled.img`
  background-color: white;
  padding: 0.2rem;
  width: 30px;
  height: 30px;
  margin-right: 1rem;
  border-radius: 10px;
  border: 2px solid var(--water);
`;

export const NavHeaderButton = styled.button`
  font-family: "Galmuri";
  background-color: rgba(0, 0, 0, 0);
  border: none;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 30px;
    height: 30px;
  }
  span {
    text-shadow: var(--text-strock-3px-white);
  }
`;
