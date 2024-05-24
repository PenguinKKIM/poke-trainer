import { auth, dataBase } from "../../firebase";
import {
  ButtonContainer,
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
import { useEffect, useState } from "react";
import { Timestamp, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { TextContainer, TextHeaderContainer, TextLi, TextUl } from "../Navigation/style";
import { MiddleButton } from "../Buttons/Buttons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { HandleNav } from "../Buttons/HandleNav";
import { TitleContainer } from "../shared/style";

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
  code?: string;
  displayName?: string;
  photoURL?: string;
  greeting?: string;
  faction?: string;
  playTime?: string;
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

  const editText = async (raid: Raid) => {
    const { value: formValues } = await Swal.fire({
      title: "글 수정",
      html:
        `<div style="display: flex; align-items: center; flex-direction: column;">` +
        `<select id="swal-input1" class="swal2-input">
          <option value="레이드" ${raid.category === "레이드" ? "selected" : ""}>레이드</option>
          <option value="체육관" ${raid.category === "체육관" ? "selected" : ""}>체육관</option>
        </select>` +
        `<textarea id="swal-input2" class="swal2-textarea" placeholder="내용" style="resize: none;">${raid.text}</textarea>` +
        `</div>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById("swal-input1") as HTMLSelectElement).value,
          (document.getElementById("swal-input2") as HTMLTextAreaElement).value,
        ];
      },
      showCancelButton: true,
    });

    if (formValues) {
      const [category, text] = formValues;
      try {
        const raidDoc = doc(dataBase, "raid", raid.id);
        await updateDoc(raidDoc, { category, text });
        const updatedRaidList = raidList.map((item) => (item.id === raid.id ? { ...item, category, text } : item));
        setRaidList(updatedRaidList);
        Swal.fire({
          html: "<p>수정 되었습니다!</p>",
          showCancelButton: true,
        });
      } catch (error) {
        console.error("Error updating document: ", error);
        Swal.fire("오류가 발생했습니다.", "", "error");
      }
    }
  };

  const deleteText = async (raid: Raid) => {
    const result = await Swal.fire({
      html: "<p>삭제 하시겠습니까?</p>",
      showCancelButton: true,
      showConfirmButton: true,
    });

    if (result.isConfirmed) {
      try {
        const raidDoc = doc(dataBase, "raid", raid.id);
        await deleteDoc(raidDoc);
        const updatedRaidList = raidList.filter((item) => item.id !== raid.id);
        setRaidList(updatedRaidList);
        Swal.fire({
          html: "<p>삭제 되었습니다!</p>",
          showCancelButton: true,
        });
      } catch (error) {
        console.error("Error deleting document: ", error);
        Swal.fire("오류가 발생했습니다.", "", "error");
      }
    }
  };

  return (
    <>
      {currentUser === null ? (
        <>
          <TitleContainer>
            <div>
              <img src="/image/icon/ditto_icon.png" alt="메타" />
              <h2>마이 페이지</h2>
            </div>
          </TitleContainer>

          <h2>로그인 해주세요</h2>
          <MiddleButton style={{ marginTop: "1rem" }} onClick={HandleNav(navigate, "/login")}>
            로그인 하러가기
          </MiddleButton>
          <MiddleButton style={{ marginTop: "1rem" }} onClick={HandleNav(navigate, "/signup")}>
            회원가입 하러가기
          </MiddleButton>
        </>
      ) : (
        <>
          <TitleContainer>
            <div>
              <img src="/image/icon/ditto_icon.png" alt="메타" />
              <h2>마이 페이지</h2>
            </div>
            {!currentUser ? (
              <></>
            ) : (
              <MiddleButton
                fontcolor="var(--color-prime)"
                btncolor="var(--grass)"
                onClick={HandleNav(navigate, "/editprofile")}
              >
                프로필 수정하기
              </MiddleButton>
            )}
          </TitleContainer>
          <UserContainer backcolor={userData?.faction} backImg={userData?.faction}>
            <Card>
              {userData ? (
                <>
                  <CardHeader>
                    <img src="image/icon/ball_icon02.png" alt="아이콘" />
                    Trainer's Card
                    <img src="image/icon/ball_icon.png" alt="아이콘" />
                  </CardHeader>
                  <CardId>
                    <UserName>
                      <span> 닉네임 </span>: {userData.displayName || currentUser.displayName}
                    </UserName>
                    <Code>
                      <span> 코드 </span> : {userData.code || "친구 코드를 입력해주세요"}
                    </Code>
                  </CardId>
                  <CardImg>
                    <CardImgText>
                      <div>
                        <Time>주로 플레이 하는 시간</Time>
                        <Context backcolor={userData.faction}>
                          {userData.playTime || "플레이시간을 입력해주세요."}
                        </Context>
                      </div>
                      <div>
                        <Faction>진영</Faction>
                        <Context backcolor={userData.faction}>{userData.faction || "진영을 입력해주세요."}</Context>
                      </div>
                    </CardImgText>
                    <UserImage
                      src={userData.photoURL || currentUser.photoURL || "image/default_profile_img.png"}
                      alt={userData.displayName || currentUser.displayName || "기본 이미지"}
                    />
                  </CardImg>
                  <CardGreetings>
                    <CardGreetingsTitle>인사말</CardGreetingsTitle>
                    <Context backcolor={userData.faction}>
                      {userData.greeting || "여기에는 인사말이 들어가겠죵"}
                    </Context>
                  </CardGreetings>
                </>
              ) : (
                <div>정보를 수정해주세요!</div>
              )}
            </Card>
          </UserContainer>
          <TitleContainer>
            <div>
              <img src="/image/icon/ditto_icon.png" alt="메타" />
              <h2>내가 쓴 글</h2>
            </div>
          </TitleContainer>
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
                    <MiddleButton onClick={() => editText(raid)}>수정하기</MiddleButton>
                    <MiddleButton
                      onClick={() => deleteText(raid)}
                      fontcolor="var(--color-prime)"
                      btncolor="var(--poke-dex-red)"
                    >
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
      )}
    </>
  );
}

export default MyPage;
