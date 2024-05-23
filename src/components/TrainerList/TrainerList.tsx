import { collection, getDocs, query } from "firebase/firestore";
import { dataBase } from "../../firebase";
import { useEffect, useState } from "react";

interface User {
  id: string;
  displayName: string;
  // 다른 사용자 데이터 필드를 여기에 추가하세요
}

function TrainerList() {
  const [userList, setUserList] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const dataRef = collection(dataBase, "users"); // "users" 컬렉션 이름 확인
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
      <ul>
        {userList.map((user) => (
          <li key={user.id}>{user.displayName}</li>
        ))}
      </ul>
    </>
  );
}

export default TrainerList;
