import { useState } from "react";
import { MiddleButton, NormalButton } from "../Buttons/Buttons";
import onChangeInput from "./OnChangeInput";
import { ErrorMessage, FormContainer, Input, Label } from "./style";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import styled from "styled-components";

function JoinInput() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [passwordCheckClicked, setPasswordCheckClicked] = useState(false);

  const [joinError, setJoinError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fireBaseError, setFireBaseError] = useState("");

  const [loading, setLoading] = useState(false);

  const onChangeId = (event: React.FormEvent<HTMLInputElement>) => {
    onChangeInput(event, setUserId);
  };

  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    onChangeInput(event, setUserPassword);
  };

  const onChangePasswordCheck = (event: React.FormEvent<HTMLInputElement>) => {
    onChangeInput(event, setUserPasswordCheck);
  };

  const handlePasswordCheck = (event: React.MouseEvent) => {
    event.stopPropagation();
    switch (true) {
      case userPassword === "":
        setPasswordError("비밀번호를 입력해주세요.");
        break;
      case userPassword.length < 6:
        setPasswordError("비밀번호는 6자리 이상을 입력해주세요");
        break;
      case userPassword !== userPasswordCheck:
        setPasswordError("비밀번호 확인이 일치하지 않습니다. 다시 입력해주세요.");
        break;
      default:
        setPasswordError("비밀번호 확인이 일치합니다.");
        setPasswordCheckClicked(true);
        break;
    }
  };

  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    onChangeInput(event, setUserEmail);
  };

  const setJoinErrorMessage = (error: FirebaseError) => {
    let errorMessage = "알 수 없는 오류가 발생했습니다";
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "이미 가입 된 이메일 입니다";
        break;
      default:
        errorMessage = "오류가 발생했습니다: " + error.message;
        break;
    }
    setFireBaseError(errorMessage);
  };

  const onSubmitJoin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const setErrorEmpty = () => {
      setJoinError("");
      setPasswordError("");
      setEmailError("");
    };
    switch (true) {
      case loading:
        Swal.fire("로딩 중입니다. 잠시만 기다려 주세요.");
        return;
      case userId === "":
        setErrorEmpty();
        setJoinError("닉네임을 입력해주세요");
        break;
      case passwordCheckClicked !== true:
        setErrorEmpty();
        setPasswordError("비밀번호를 확인해주세요");
        break;
      case userEmail === "":
        setErrorEmpty();
        setEmailError("이메일을 입력해 주세요");
        break;
      default:
        setErrorEmpty();
        setLoading(true);
        try {
          const credentials = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
          console.log(credentials.user);
          await updateProfile(credentials.user, { displayName: userId });
          Swal.fire({
            html: "<p> 회원가입이 완료 되었습니다. </p>",
            showConfirmButton: true,
          });
          navigate("/");
        } catch (error) {
          if (error instanceof FirebaseError) {
            setJoinErrorMessage(error);
          }
        } finally {
          setLoading(false);
        }
    }
  };
  const linkToLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/login");
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FormContainer onSubmit={onSubmitJoin}>
          <TitleContainer>
            <div>
              <img src="/image/icon/ditto_icon.png" alt="메타" />
              <h2>회원가입</h2>
            </div>
            <MiddleButton btncolor="var(--grass)" fontcolor="var(--color-prime)" onClick={linkToLogin}>로그인 하러가기</MiddleButton>
          </TitleContainer>
          <Label htmlFor="userId">
            닉네임
            <Input
              type="text"
              name="userId"
              value={userId}
              onChange={onChangeId}
              placeholder="사용하실 닉네임을 입력하세요"
            />
            <ErrorMessage>{joinError}</ErrorMessage>
          </Label>
          <Label htmlFor="password">
            비밀번호
            <Input
              type="password"
              name="password"
              value={userPassword}
              onChange={onChangePassword}
              placeholder="패스워드를 입력하세요"
            />
          </Label>
          <Label htmlFor="passwordCheck">
            비밀번호 확인
            <Input
              type="password"
              name="passwordCheck"
              value={userPasswordCheck}
              onChange={onChangePasswordCheck}
              placeholder="패스워드를 다시 입력해주세요."
            />
            <ErrorMessage>{passwordError}</ErrorMessage>
          </Label>

          <NormalButton type="button" onClick={handlePasswordCheck} btncolor="var(--grass)">
            비밀번호 확인
          </NormalButton>

          <Label htmlFor="email">
            이메일
            <Input
              type="email"
              name="email"
              value={userEmail}
              onChange={onChangeEmail}
              placeholder="이메일을 입력해주세요"
            />
            <ErrorMessage>{emailError}</ErrorMessage>
          </Label>
          <NormalButton type="submit" btncolor="var(--water)">
            가입하기
          </NormalButton>
          <ErrorMessage>{fireBaseError}</ErrorMessage>
        </FormContainer>
      )}
    </>
  );
}
const TitleContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 1rem;
  div{
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  img{
    width: 2rem;
    height: 2rem;
  }
  button{
    width: 15%;
  }
`;
export default JoinInput;
