import { NormalButton } from "../Buttons/Buttons";
import { useEffect, useRef, useState } from "react";
import { FormContainer, Input, Label } from "./style";
import onChangeInput from "./OnChangeInput";
import Swal from "sweetalert2";
import { auth } from "../../firebase";
import { AuthErrorCodes, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

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

  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (true) {
      case loading:
        setLoading(true);
        return;
      case userEmail === "":
        setEmailError("이메일을 입력해 주세요");
        setPasswordError("");
        break;
      case userPassword === "":
        setEmailError("");
        setPasswordError("패스워드를 입력해주세요");
        break;
      default:
        setLoading(true);
        setEmailError("");
        setPasswordError("");
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
            console.log(error.code);
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
        let errorMessage = "알 수 없는 오류가 발생했습니다";
        switch (error.code) {
          case AuthErrorCodes.INVALID_APP_CREDENTIAL:
            errorMessage = "등록되지 않은 계정 입니다";
            break;
          case AuthErrorCodes.NETWORK_REQUEST_FAILED:
            errorMessage = "네트워크 오류가 발생했습니다";
            break;
          default:
            errorMessage = "오류가 발생했습니다: " + error.message;
            break;
        }
        setFireBaseError(errorMessage);
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

  return (
    <FormContainer onSubmit={onSubmitLogin}>
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

      <NormalButton type="submit" fontcolor="white" btncolor="#0000FF">
        로그인
      </NormalButton>
      <NormalButton onClick={handleGoogleLogin}>구글 로그인</NormalButton>
      <span>{fireBaseError}</span>
    </FormContainer>
  );
}

export default LoginInput;
