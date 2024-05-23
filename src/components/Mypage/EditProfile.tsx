import styled from "styled-components";
import { auth, dataBase } from "../../firebase"; // 이미 설정된 Firebase 인스턴스
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function EditProfile() {
  const currentUser = auth.currentUser;
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [greeting, setGreeting] = useState("");
  const [faction, setFaction] = useState("");
  const [code, setCode] = useState("");
  const [playTime, setPlayTime] = useState("");

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

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentUser) {
      try {
        await updateProfile(currentUser, {
          displayName,
          photoURL,
        });

        // Firestore에 저장
        const userDoc = doc(dataBase, "users", currentUser.uid);
        await setDoc(userDoc, {
          displayName,
          photoURL,
          greeting,
          faction,
          code,
          playTime,
        });

        alert("프로필이 업데이트되었습니다.");
      } catch (error) {
        console.error("프로필 업데이트 중 오류가 발생했습니다:", error);
        alert("프로필 업데이트 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <ProfileContainer>
      <h2>프로필 수정</h2>
      <form onSubmit={handleUpdateProfile}>
        <label>
          닉네임:
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <label>
          프로필 사진 URL:
          <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
        </label>
        <label>
          인사말:
          <input type="text" value={greeting} onChange={(e) => setGreeting(e.target.value)} />
        </label>
        <label>
          진영:
          <input type="text" value={faction} onChange={(e) => setFaction(e.target.value)} />
        </label>
        <label>
          코드:
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        </label>
        <label>
          주로하는 시간대:
          <input type="text" value={playTime} onChange={(e) => setPlayTime(e.target.value)} />
        </label>
        <button type="submit">업데이트</button>
      </form>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;

    label {
      display: flex;
      flex-direction: column;
      font-size: 1rem;

      input {
        margin-top: 0.5rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }

    button {
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

export default EditProfile;
