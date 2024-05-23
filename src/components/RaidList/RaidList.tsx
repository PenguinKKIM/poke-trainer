import { useEffect, useState } from "react";
import { auth, dataBase } from "../../firebase";
import { Timestamp, collection, deleteDoc, doc, getDocs, limit, orderBy, query, startAfter, updateDoc } from "firebase/firestore";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { TextContainer, TextHeaderContainer, TextLi, TextUl } from "../Navigation/style";
import styled from "styled-components";
import { ButtonContainer } from "../FormInput/style";
import { MiddleButton } from "../Buttons/Buttons";
import Swal from "sweetalert2";

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
  const navigate = useNavigate();

  const currentUser = auth.currentUser;
  const [raidList, setRaidList] = useState<Raid[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const collectionRef = collection(dataBase, "raid");
      const totalQuery = await getDocs(collectionRef);
      setTotalPages(Math.ceil(totalQuery.size / ITEMS_PER_PAGE));

      let dataQuery;

      if (page === 1) {
        dataQuery = query(collectionRef, orderBy("createdAt", "desc"), limit(ITEMS_PER_PAGE));
      } else {
        const startDoc = await getDocs(
          query(collectionRef, orderBy("createdAt", "desc"), limit((page - 1) * ITEMS_PER_PAGE))
        );
        const lastVisibleDoc = startDoc.docs[startDoc.docs.length - 1];
        dataQuery = query(
          collectionRef,
          orderBy("createdAt", "desc"),
          startAfter(lastVisibleDoc),
          limit(ITEMS_PER_PAGE)
        );
      }

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
    fetchData(currentPage);
  }, [currentPage]);

  const editText = async (raid: Raid) => {
    const { value: formValues } = await Swal.fire({
      title: '글 수정',
      html: `<div style="display: flex; align-items: center; flex-direction: column;">` +
        `<select id="swal-input1" class="swal2-input">
          <option value="레이드" ${raid.category === "레이드" ? "selected" : ""}>레이드</option>
          <option value="체육관" ${raid.category === "체육관" ? "selected" : ""}>체육관</option>
        </select>` +
        `<textarea id="swal-input2" class="swal2-textarea" placeholder="내용" style="resize: none;">${raid.text}</textarea>`
        + `</div>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLSelectElement).value,
          (document.getElementById('swal-input2') as HTMLTextAreaElement).value
        ];
      },
      showCancelButton: true,
    });

    if (formValues) {
      const [category, text] = formValues;
      try {
        const raidDoc = doc(dataBase, "raid", raid.id);
        await updateDoc(raidDoc, { category, text });
        fetchData(currentPage);
        Swal.fire({
          html: "<p>수정 되었습니다!</p>",
          showCancelButton: true,
        });
      } catch (error) {
        console.error("Error updating document: ", error);
        Swal.fire({
          html: "<p>오류가 발생했습니다</p>",
          showCancelButton: true,
        });
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
        fetchData(currentPage);
        Swal.fire({
          html: "<p>삭제 되었습니다!</p>",
          showCancelButton: true,
        });
      } catch (error) {
        console.error("Error deleting document: ", error);
        Swal.fire('오류가 발생했습니다.', '', 'error');
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleToWrite = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/raid/write");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TitleContainer>
            <div>
              <img src="/image/icon/ditto_icon.png" alt="메타" />
              <h2>레이드/ 체육관 게시판</h2>
            </div>
            {!currentUser ? <></> : <MiddleButton fontcolor="var(--color-prime)" btncolor="var(--grass)" onClick={handleToWrite}>글 등록하기</MiddleButton>}
          </TitleContainer>
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
                  {currentUser?.uid === raid.userId ? (
                    <ButtonContainer>
                      <MiddleButton onClick={() => editText(raid)}>수정하기</MiddleButton>
                      <MiddleButton onClick={() => deleteText(raid)} fontcolor="var(--color-prime)" btncolor="var(--poke-dex-red)">
                        삭제하기
                      </MiddleButton>
                    </ButtonContainer>
                  ) : (
                    <></>
                  )}
                </TextLi>
              ))}
            </TextUl>
          )}
          <PaginationContainer>
            <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
              이전
            </PaginationButton>
            <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
              다음
            </PaginationButton>
          </PaginationContainer>
        </>
      )}
    </>
  );
}
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: var(--water);
  color: var(--list-background-color);
  cursor: pointer;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;


const TitleContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 1rem;
  div{
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  img{
    width: 2rem;
    height: 2rem;
  }
  button{
    width: 10%;
  }
`;
export default RaidList;
