import { useEffect, useState } from "react";
import { auth, dataBase } from "../../firebase";
import { Timestamp, collection, getDocs, orderBy, query } from "firebase/firestore";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    setLoading(true);
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
      {loading ? (
        <Loading />
      ) : (
        <>
          {!currentUser ? <></> : <Link to="write">글 등록하기</Link>}
          <div>총 글 수: {raidList.length}</div>
          {raidList.length === 0 ? (
            <div>등록된 글이 없습니다</div>
          ) : (
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
                </TextLi>
              ))}
            </TextUl>
          )}
        </>
      )}
    </>
  );
}

const TextUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TextLi = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 2px solid var(--water);
  border-radius: 10px;
  padding: 1rem 0.7rem;
  background-color: #c3e3ff;
  &:nth-child(2n) {
    background-color: var(--flying);
    border: 2px solid var(--normal);
  }
`;

const TextHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 0.7rem;
    color: var(--normal);
  }
`;

const TextContainer = styled.div`
  background-color: var(--list-background-color);
  border-radius: 10px;
  padding: 0.4rem;
`;

export default RaidList;
