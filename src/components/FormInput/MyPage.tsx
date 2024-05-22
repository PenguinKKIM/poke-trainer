import styled from "styled-components";
import { auth } from "../../firebase";
import { UserContainer, UserImage } from "./style";

function MyPage() {
  const currentUser = auth.currentUser;

  return (
    <>
      {currentUser === null ? (
        <div>로그인해주세요</div>
      ) : (
        <UserContainer>
          <CardHeader>
            <img src="image/icon/ball_icon02.png" alt="아이콘" />
            Trainer's Card
            <img src="image/icon/ball_icon.png" alt="아이콘" />
          </CardHeader>
          <CardId>
            <Name>
              <span> 닉네임 </span>: {currentUser.displayName}
            </Name>
            <Code>
              <span> 코드 </span> : {currentUser.uid}
            </Code>
          </CardId>
          <CardImg>
            <CardImgText>
              <div>
                <Time>주로 플레이 하는 시간</Time>
                <Context>오전 00:00시 부터 오후 00:00시 까지</Context>
              </div>
              <div>
                <div>진영</div>
                <Context>오전 00:00시 부터 오후 00:00시 까지</Context>
              </div>
            </CardImgText>
            <UserImage src={currentUser.photoURL || "이미지없음"} alt={currentUser.displayName || "이미지없음"} />
          </CardImg>
          <div>
            <div>인사말</div>
            <p>오전 00:00시 부터 오후 00:00시 까지</p>
          </div>
        </UserContainer>
      )}
    </>
  );
}

const CardHeader = styled.h3`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  img {
    width: 1.2rem;
    background-color: aliceblue;
    padding: 0.2rem;
    border-radius: 10px;
  }
`;

const CardId = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const BaseStyle = styled.div`
  font-size: 0.8rem;
  background-color: aliceblue;
  padding: 0.5rem 0.3rem;
  border-radius: 10px;
  border: 1.5px solid var(--water);
`;

const Name = styled(BaseStyle)`
  span {
    font-size: 1rem;
  }
`;
const Code = styled(Name)``;

const CardImg = styled(BaseStyle)`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Time = styled.div``;
const Context = styled.div``;

const CardImgText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const CardGreetings = styled.div``;

export default MyPage;
