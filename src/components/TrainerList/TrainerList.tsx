import { collection, getDocs, query } from "firebase/firestore";
import { dataBase } from "../../firebase";
import { useEffect, useState } from "react";
import {
  Card,
  CardGreetings,
  CardGreetingsTitle,
  CardHeader,
  CardId,
  CardImg,
  CardImgText,
  Code,
  Context,
  Faction,
  Time,
  UserContainer,
  UserImage,
  UserName,
} from "../FormInput/style";

import { UserListLi, UserListUl } from "./style";
import { TitleContainer } from "../shared/style";

interface User {
  id?: string;
  code: string;
  displayName: string;
  photoURL: string;
  greeting: string;
  faction: string;
  playTime: string;
}

function TrainerList() {
  const [userList, setUserList] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const dataRef = collection(dataBase, "users");
      const dataQuery = query(dataRef);
      const dataResult = await getDocs(dataQuery);
      const userData = dataResult.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUserList(userData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <UserListUl>
        <TitleContainer>
          <div>
            <img src="/image/icon/ditto_icon.png" alt="메타" />
            <h2>트레이너 리스트 보기</h2>
          </div>
        </TitleContainer>
        {userList.map((user) => (
          <UserListLi key={user.id}>
            <UserContainer backcolor={user?.faction} backImg={user?.faction}>
              <Card>
                {user ? (
                  <>
                    <CardHeader>
                      <img src="image/icon/ball_icon02.png" alt="아이콘" />
                      Trainer's Card
                      <img src="image/icon/ball_icon.png" alt="아이콘" />
                    </CardHeader>
                    <CardId>
                      <UserName>
                        <span> 닉네임 </span>: {user.displayName}
                      </UserName>
                      <Code>
                        <span> 코드 </span> : {user.code || "친구 코드를 입력해주세요"}
                      </Code>
                    </CardId>
                    <CardImg>
                      <CardImgText>
                        <div>
                          <Time>주로 플레이 하는 시간</Time>
                          <Context backcolor={user.faction}>{user.playTime || "플레이시간을 입력해주세요."}</Context>
                        </div>
                        <div>
                          <Faction>진영</Faction>
                          <Context backcolor={user.faction}>{user.faction || "진영을 입력해주세요."}</Context>
                        </div>
                      </CardImgText>
                      <UserImage
                        src={user.photoURL || "image/default_profile_img.png"}
                        alt={user.displayName || "기본 이미지"}
                      />
                    </CardImg>
                    <CardGreetings>
                      <CardGreetingsTitle>인사말</CardGreetingsTitle>
                      <Context backcolor={user.faction}>{user.greeting || "여기에는 인사말이 들어가겠죵"}</Context>
                    </CardGreetings>
                  </>
                ) : (
                  <div>사용자 데이터를 불러오는 중...</div>
                )}
              </Card>
            </UserContainer>
          </UserListLi>
        ))}
      </UserListUl>
    </>
  );
}

export default TrainerList;
