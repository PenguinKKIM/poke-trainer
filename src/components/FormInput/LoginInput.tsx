import { NormalButton } from "../Buttons/Buttons";
import { useState } from "react";
import { FormContainer, Input, Label } from "./style";
import onChangeInput from "./OnChangeInput";
import Swal from "sweetalert2";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

function LoginInput() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");


  const [emailError, setEmailError] = useState("");
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
        Swal.fire("로딩 중입니다. 잠시만 기다려 주세요.");
        return;
      case userEmail === "":
        setEmailError("이메일을 입력해 주세요");
        break;
      default:
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
          })
        } catch (error) {
          if (error instanceof FirebaseError) {
            setFireBaseError(error.message);
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
      })
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFireBaseError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

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
        />
      </Label>

      <NormalButton type="submit" fontcolor="white" btncolor="#0000FF">
        로그인
      </NormalButton>
      <NormalButton onClick={handleGoogleLogin}>
        구글 로그인
      </NormalButton>
      <span>{fireBaseError}</span>
    </FormContainer>
  );
}

export default LoginInput;
