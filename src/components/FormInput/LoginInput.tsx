import { NormalButton } from "../Buttons/Buttons";
import { useState } from "react";
import { FormContainer, Input, Label } from "./style";
import onChangeInput from "./OnChangeInput";

function LoginInput() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onChangeId = (event: React.FormEvent<HTMLInputElement>) => {
    onChangeInput(event, setUserId);
  };

  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    onChangeInput(event, setUserPassword);
  };

  const onSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <FormContainer onSubmit={onSubmitLogin}>
      <Label htmlFor="userId">
        아이디
        <Input
          type="text"
          name="userId"
          value={userId}
          id="userId"
          placeholder="아이디를 입력하세요"
          onChange={onChangeId}
        />
      </Label>
      <Label htmlFor="userPassword">
        패스워드
        <Input
          type="password"
          name="userId"
          value={userPassword}
          id="userPassword"
          placeholder="패스워드를 입력하세요"
          onChange={onChangePassword}
        />
      </Label>

      <NormalButton type="submit" fontcolor="white" btncolor="#0000FF">
        로그인
      </NormalButton>
    </FormContainer>
  );
}

export default LoginInput;
