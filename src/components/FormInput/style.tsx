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
  padding: 1rem;
  gap: 0.2rem;
`;

export const Input = styled.input`
  padding: 1rem;
  border-radius: 10px;
  border: none;
  border: 1px solid var(--normal);
`;

export const ErrorMessage = styled.span`
  color: var(--poke-dex-red);
  padding: 0.2rem;
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
  z-index: 100;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: aliceblue;
  }
`;

export const ButtonContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  @media screen and (min-width: 850px) {
    width: 35%;
  }
`;

interface UserContainerProps {
  backcolor?: string;
  backImg?: string;
}

export const UserContainer = styled.div<UserContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;

  background-color: ${(props) => {
    let userBackColor;
    switch (props.backcolor) {
      case "미스틱":
        userBackColor = "var(--ice)";
        break;
      case "발로":
        userBackColor = "var(--fire)";
        break;
      case "인스팅트":
        userBackColor = "var(--electric)";
        break;
      default:
        userBackColor = "var(--normal)";
    }
    return userBackColor;
  }};

  background-image: ${(props) => {
    let backImg;
    switch (props.backImg) {
      case "미스틱":
        backImg = "url(image/icon/articuno_icon.png)";
        break;
      case "발로":
        backImg = "url(image/icon/fire_icon.png)";
        break;
      case "인스팅트":
        backImg = "url(image/icon/thunder_icon.png)";
        break;
      default:
        backImg = "url()";
    }
    return backImg;
  }};

  background-repeat: no-repeat;
  background-position: 90% 20%;

  border: 3px solid var(--water);
  border-radius: 10px;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const UserImage = styled.img`
  width: 100px;
  height: 100px;
`;

export const CardHeader = styled.h3`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-overflow: var(--text-strock-3px-white);
  img {
    width: 1.2rem;
    background-color: aliceblue;
    padding: 0.2rem;
    border-radius: 10px;
  }
`;

export const CardId = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const BaseStyle = styled.div`
  font-size: 0.8rem;
  background-color: aliceblue;
  padding: 0.5rem 0.3rem;
  border-radius: 10px;
  border: 1.5px solid var(--water);
`;

export const UserName = styled(BaseStyle)`
  span {
    font-size: 1rem;
  }
`;
export const Code = styled(UserName)``;

export const CardImg = styled(BaseStyle)`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const Time = styled.div``;
export const Context = styled.div``;

export const CardImgText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const Card = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CardGreetings = styled(BaseStyle)``;
