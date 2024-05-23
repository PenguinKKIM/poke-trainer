import { auth, dataBase, storage } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { DropdownContainer, DropdownHeader, DropdownList, DropdownListContainer, FormContainer, Input, Label, ListItem } from "../FormInput/style";
import { NormalButton } from "../Buttons/Buttons";
import styled from "styled-components";

function EditProfile() {
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [greeting, setGreeting] = useState("");
  const [faction, setFaction] = useState("");
  const [code, setCode] = useState("");
  const [playTime, setPlayTime] = useState("");

  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const onCategoryClick = (category: string) => {
    setCategory(category);
    setFaction(category);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const userDoc = doc(dataBase, "users", currentUser.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setGreeting(data.greeting || "");
          setFaction(data.faction || "");
          setCode(data.code || "");
          setPlayTime(data.playTime || "");
        }
      };
      fetchUserData();
    }
  }, [currentUser]);

  const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentUser) {
      try {
        Swal.fire({
          html: "<p>수정하시겠습니까?</p>",
          showCancelButton: true,
          showConfirmButton: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await updateProfile(currentUser, {
              displayName,
              photoURL,
            });
            const userDoc = doc(dataBase, "users", currentUser.uid);
            await setDoc(userDoc, {
              displayName,
              photoURL,
              greeting,
              faction,
              code,
              playTime,
            });
            navigate(-1);
          }
        });
      } catch (error) {
        console.error("프로필 업데이트 중 오류가 발생했습니다:", error);
      }
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const storageRef = ref(storage, `profile_pictures/${currentUser?.uid}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setPhotoURL(downloadURL);
      } catch (error) {
        console.error("파일 업로드 중 오류가 발생했습니다:", error);
      }
    }
  };

  return (
    <>
      <h2>내 정보 수정하기</h2>
      <FormContainer onSubmit={handleUpdateProfile}>
        <Label>
          닉네임:
          <Input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </Label>
        <Label>
          친구 코드:
          <Input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        </Label>


        <Label>
          주로하는 시간대:
          <Input type="text" value={playTime} onChange={(e) => setPlayTime(e.target.value)} />
        </Label>
        <Label>
          진영:
          <DropdownContainer>
            <DropdownHeader onClick={toggleDropdown}>{category || "진영을 선택해주세요"}</DropdownHeader>
            {isOpen && (
              <DropdownListContainer ref={dropdownRef}>
                <DropdownList>
                  <ListItem onClick={() => onCategoryClick("발로")}>팀 발로 <IconImg src="image/icon/fire_icon.png" alt="" /> </ListItem>
                  <ListItem onClick={() => onCategoryClick("미스틱")}>팀 미스틱 <IconImg src="image/icon/articuno_icon.png" alt="" /></ListItem>
                  <ListItem onClick={() => onCategoryClick("인스팅트")}>팀 인스팅트<IconImg src="image/icon/thunder_icon.png" alt="" /></ListItem>
                </DropdownList>
              </DropdownListContainer>
            )}
          </DropdownContainer>
        </Label>

        <Label>
          인사말:
          <Input type="text" value={greeting} onChange={(e) => setGreeting(e.target.value)} />
        </Label>
        <Label>
          프로필 사진:
          <ProfileImgContainer>
            <Input type="file" onChange={handleFileChange} accept="image/*" />
            {photoURL && <ProfileImg src={photoURL} alt={displayName} />}
          </ProfileImgContainer>
        </Label>
        <NormalButton fontsize="1.2rem" fontcolor="var(--color-prime)" btncolor="var(--grass)" type="submit">업데이트</NormalButton>
      </FormContainer>
    </>
  );
}

const IconImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

const ProfileImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImg = styled.img`
  width: 20%;
  height: 20%;
`;

export default EditProfile;
