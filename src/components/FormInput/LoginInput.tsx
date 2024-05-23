import { MiddleButton, NormalButton } from "../Buttons/Buttons";
import { useEffect, useRef, useState } from "react";
import { FormContainer, Input, Label } from "./style";
import onChangeInput from "./OnChangeInput";
import Swal from "sweetalert2";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LoginInput() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [fireBaseError, setFireBaseError] = useState("");

  const [loading, setLoading] = useState(false);

  const onChangeId = (event: React.FormEvent<HTMLInputElement>) => {
    onChangeInput(event, setUserEmail);
  };

  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    onChangeInput(event, setUserPassword);
  };

  const setLoginErrorMessage = (error: FirebaseError) => {
    let errorMessage = "알 수 없는 오류가 발생했습니다";
    switch (error.code) {
      case "auth/invalid-credential":
        errorMessage = "이메일이나 비밀번호를 다시 확인해주세요";
        break;
      case "auth/user-disabled":
        errorMessage = "사용이 중지된 계정입니다";
        break;
      case "auth/user-not-found":
        errorMessage = "사용자를 찾을 수 없습니다";
        break;
      case "auth/network-request-failed":
        errorMessage = "네트워크 오류가 발생했습니다";
        break;
      default:
        errorMessage = "오류가 발생했습니다: " + error.message;
        break;
    }
    setFireBaseError(errorMessage);
  };

  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const setErrorEmpty = () => {
      setPasswordError("");
      setEmailError("");
    };
    switch (true) {
      case loading:
        setLoading(true);
        return;
      case userEmail === "":
        setErrorEmpty();
        setEmailError("이메일을 입력해 주세요");
        break;
      case userPassword === "":
        setErrorEmpty();
        setPasswordError("패스워드를 입력해주세요");
        break;
      default:
        setErrorEmpty();
        setLoading(true);
        try {
          await signInWithEmailAndPassword(auth, userEmail, userPassword);
          Swal.fire({
            html: "<p> 로그인 되었습니다 </p>",
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        } catch (error) {
          if (error instanceof FirebaseError) {
            setLoginErrorMessage(error);
          }
        } finally {
          setLoading(false);
        }
    }
  };

  const handleGoogleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      console.log(googleUser);
      Swal.fire({
        html: "<p> 로그인 되었습니다 </p>",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        setLoginErrorMessage(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (emailError) {
      emailInputRef.current?.focus();
    } else if (passwordError) {
      passwordInputRef.current?.focus();
    }
  }, [emailError, passwordError]);

  const linkToJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/signup");
  }

  return (
    <FormContainer onSubmit={onSubmitLogin}>
      <TitleContainer>
        <div>
          <img src="/image/icon/ditto_icon.png" alt="메타" />
          <h2>로그인</h2>
        </div>
        <MiddleButton btncolor="var(--grass)" fontcolor="var(--color-prime)" onClick={linkToJoin}>회원가입 하러가기</MiddleButton>
      </TitleContainer>
      <Label htmlFor="userEmail">
        이메일
        <Input
          type="email"
          name="userEmail"
          value={userEmail}
          id="userEmail"
          placeholder="이메일을 입력하세요"
          onChange={onChangeId}
          ref={emailInputRef}
        />
        <span>{emailError}</span>
      </Label>
      <Label htmlFor="userPassword">
        패스워드
        <Input
          type="password"
          name="userEmail"
          value={userPassword}
          id="userPassword"
          placeholder="패스워드를 입력하세요"
          onChange={onChangePassword}
          autoComplete="current-password"
          ref={passwordInputRef}
        />
        <span>{passwordError}</span>
      </Label>

      <NormalButton type="submit" fontcolor="white" btncolor="var(--water)">
        로그인
      </NormalButton>
      <NormalButton onClick={handleGoogleLogin}>
        <img src="image/icon/google_icon.png" />
        구글 로그인
      </NormalButton>
      <span>{fireBaseError}</span>
    </FormContainer>
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


export default LoginInput;
