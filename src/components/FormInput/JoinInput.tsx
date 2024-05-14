import { useState } from "react";
import { NormalButton } from "../Buttons/Buttons";
import onChangeInput from "./OnChangeInput";
import { FormContainer, Input, Label } from "./style";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

function JoinInput() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [passwordCheckClicked, setPasswordCheckClicked] = useState(false);
  const [userEmail, setUserEmail] = useState("");

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

  const onSubmitJoin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (true) {
      case loading:
        Swal.fire("로딩 중입니다. 잠시만 기다려 주세요.");
        return;
      case userId === "":
        setJoinError("닉네임을 입력해주세요");
        break;
      case passwordCheckClicked !== true:
        setPasswordError("비밀번호를 확인해주세요");
        break;
      case userEmail === "":
        setEmailError("이메일을 입력해 주세요");
        break;
      default:
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
            setFireBaseError(error.message);
          }
        } finally {
          setLoading(false);
        }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FormContainer onSubmit={onSubmitJoin}>
          <Label htmlFor="userId">
            아이디
            <Input
              type="text"
              name="userId"
              value={userId}
              onChange={onChangeId}
              placeholder="사용하실 닉네임을 입력하세요"
            />
            <span>{joinError}</span>
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
            <span>{passwordError}</span>
          </Label>

          <NormalButton type="button" onClick={handlePasswordCheck} btncolor="#40b088">
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
            <span>{emailError}</span>
          </Label>
          <NormalButton type="submit">가입하기</NormalButton>
          <span>{fireBaseError}</span>
        </FormContainer>
      )}
    </>
  );
}

export default JoinInput;
