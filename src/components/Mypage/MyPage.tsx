import styled from "styled-components";
import { auth, dataBase } from "../../firebase";
import { ButtonContainer, UserContainer, UserImage } from "../FormInput/style";
import { useEffect, useState } from "react";
import { Timestamp, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { TextContainer, TextHeaderContainer, TextLi, TextUl } from "../Navigation/style";
import { MiddleButton, NormalButton } from "../Buttons/Buttons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface Raid {
  id: string;
  title: string;
  text: string;
  category: string;
  createdAt: Timestamp;
  username: string;
  userId: string;
}

interface UserData {
  id?: string;
  code: string;
  displayName: string;
  photoURL: string;
  greeting: string;
  faction: string;
  playTime: string;
}

function MyPage() {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const [raidList, setRaidList] = useState<Raid[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (currentUser) {
      const fetchPosts = async () => {
        const postsRef = collection(dataBase, "raid");
        const dataQuery = query(postsRef, where("userId", "==", currentUser.uid));
        const dataResult = await getDocs(dataQuery);
        const raidData = dataResult.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Raid[];
        setRaidList(raidData);
      };
      const fetchUserData = async () => {
        const userDoc = doc(dataBase, "users", currentUser.uid);
        const userSnap = await getDoc(userDoc);
        setUserData(userSnap.data() as UserData);
      };
      fetchPosts();
      fetchUserData();
    }
  }, [currentUser]);

  const editText = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Swal.fire({
      html: "<p> 수정 하시겠습니까 ? </p>",
      showCancelButton: true,
      showConfirmButton: true,
    });
  };

  const deldteText = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Swal.fire({
      html: "<p> 삭제 하시겠습니까 ? </p>",
      showCancelButton: true,
      showConfirmButton: true,
    });
  };

  const editProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/editprofile");
  };

  return (
    <>
      {currentUser === null ? (
        <div>로그인해주세요</div>
      ) : (
        <>
          <h3>내 정보</h3>
          <UserContainer>
            <Card>
              {userData ? (
                <>
                  <CardHeader>
                    <img src="image/icon/ball_icon02.png" alt="아이콘" />
                    Trainer's Card
                    <img src="image/icon/ball_icon.png" alt="아이콘" />
                  </CardHeader>
                  <CardId>
                    <Name>
                      <span> 닉네임 </span>: {userData.displayName || currentUser.displayName}
                    </Name>
                    <Code>
                      <span> 코드 </span> : {userData.code || "친구 코드를 입력해주세요"}
                    </Code>
                  </CardId>
                  <CardImg>
                    <CardImgText>
                      <div>
                        <Time>주로 플레이 하는 시간</Time>
                        <Context>{userData.playTime || "플레이시간을 입력해주세요."}</Context>
                      </div>
                      <div>
                        <div>진영</div>
                        <Context>{userData.faction || "진영을 입력해주세요."}</Context>
                      </div>
                    </CardImgText>
                    <UserImage
                      src={userData.photoURL || currentUser.photoURL || "이미지없음"}
                      alt={userData.displayName || currentUser.displayName || "이미지없음"}
                    />
                  </CardImg>
                  <CardGreetings>
                    <div>인사말</div>
                    <p>{userData.greeting || "여기에는 인사말이 들어가겠죵"}</p>
                  </CardGreetings>
                </>
              ) : (
                <div>사용자 데이터를 불러오는 중...</div>
              )}
            </Card>
          </UserContainer>
          <NormalButton onClick={editProfile}> 내 정보 수정 하기 </NormalButton>
        </>
      )}
      <h3>내가 게시한 글</h3>
      <TextUl>
        {raidList.map((raid) => (
          <TextLi key={raid.id}>
            <TextHeaderContainer>
              <div>
                <h3>{raid.title}</h3>
                <p>{raid.username}</p>
              </div>
              <div>
                <h3>{raid.category}</h3>
                <p>{new Date(raid.createdAt.seconds * 1000).toLocaleDateString()}</p>
              </div>
            </TextHeaderContainer>
            <TextContainer>
              <p>{raid.text}</p>
            </TextContainer>
            {currentUser?.uid === raid.userId ? (
              <ButtonContainer>
                <MiddleButton onClick={editText}>수정하기</MiddleButton>
                <MiddleButton onClick={deldteText} fontcolor="var(--color-prime)" btncolor="var(--poke-dex-red)">
                  삭제하기
                </MiddleButton>
              </ButtonContainer>
            ) : (
              <></>
            )}
          </TextLi>
        ))}
      </TextUl>
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

const Card = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardGreetings = styled(BaseStyle)``;

export default MyPage;
