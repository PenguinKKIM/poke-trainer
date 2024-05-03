import { useState } from "react";
import { NormalButton } from "../Buttons/Buttons";
import onChangeInput from "./OnChangeInput";
import { FormContainer, Input, Label } from "./style";
import Swal from "sweetalert2";

function JoinInput() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
        console.log("비밀번호를 입력해주세요.");
        break;
      case userPassword !== userPasswordCheck:
        console.log("비밀번호 확인이 일치하지 않습니다. 다시 입력해주세요.");
        break;
      default:
        console.log("비밀번호 확인이 일치합니다.");
        break;
    }
  };

  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    onChangeInput(event, setUserEmail);
  };

  const onSubmitJoin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Swal.fire({
      html: "<p>회원가입이 되었습니다</p>",
    });
  };

  return (
    <>
      <FormContainer onSubmit={onSubmitJoin}>
        <Label htmlFor="userId">
          아이디
          <Input
            type="text"
            name="userId"
            value={userId}
            onChange={onChangeId}
            placeholder="사용하실 아이디를 입력하세요"
          />
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
        </Label>
        <NormalButton type="submit">가입하기</NormalButton>
      </FormContainer>
    </>
  );
}

export default JoinInput;
