import { useState } from "react";
import styled from "styled-components";
import { NormalButton } from "../Buttons/Buttons";
import { auth, dataBase } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const TextFormContainer = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 5rem;
  resize: none;

  padding: 1rem 0;
  border-radius: 10px;
`;

function TextForm() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }
  const onSubmitText = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser || text === "" || text.length > 180) return;
    try {
      setLoading(true);
      await addDoc(collection(dataBase, "raid"), {
        text,
        createdAt: Date.now(),
        username: currentUser.displayName,
        userId: currentUser.uid,
      });
      setText("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <TextFormContainer onSubmit={onSubmitText}>
      <TextArea value={text} onChange={onChangeText} placeholder="글을 입력해주세요" />
      <NormalButton type="submit">글올리기</NormalButton>
    </TextFormContainer>
  </>;
}

export default TextForm;