import { useEffect, useState } from "react";
import { auth, dataBase } from "../../firebase";
import { Timestamp, collection, getDocs, orderBy, query } from "firebase/firestore";

interface Raid {
  id: string;
  title: string;
  text: string;
  category: string;
  createdAt: Timestamp;
  username: string;
  userId: string;
}

function RaidList() {
  const currentUser = auth.currentUser;
  const [raidList, setRaidList] = useState<Raid[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const dataQuery = query(collection(dataBase, "raid"), orderBy("createdAt", "desc"));
      const dataResult = await getDocs(dataQuery);
      const raidData = dataResult.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Raid[];
      setRaidList(raidData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!currentUser ? <></> : <span>글쓰기</span>}
      <div>총 글 수: {raidList.length}</div>
      <div>
        <ul>
          {raidList.map((raid) => (
            <li key={raid.id}>
              <h3>{raid.title}</h3>
              <p>{raid.text}</p>
              <p>Category: {raid.category}</p>
              <p>작성자: {raid.username}</p>
              <p>작성일: {new Date(raid.createdAt.seconds * 1000).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RaidList;
