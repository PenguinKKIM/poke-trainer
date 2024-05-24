import { MiddleButton, NormalButton } from "../Buttons/Buttons";
import { auth, dataBase } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  Input,
  TextArea,
  FormContainer,
  Label,
  DropdownContainer,
  DropdownHeader,
  DropdownListContainer,
  DropdownList,
  ListItem,
  HeaderContainer,
  Name,
} from "./style";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TitleContainer } from "../shared/style";
import { HandleNav } from "../Buttons/HandleNav";

function TextForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const currentUser = auth.currentUser;
  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onCategoryClick = (category: string) => {
    setCategory(category);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onSubmitText = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser || text === "" || text.length > 2000) return;
    setLoading(true);
    try {
      Swal.fire({
        html: "<p> 글 을 등록하시겠습니까 ? </p>",
        showCancelButton: true,
        showConfirmButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await addDoc(collection(dataBase, "raid"), {
            title,
            text,
            category,
            createdAt: new Date(),
            username: currentUser.displayName,
            userId: currentUser.uid,
          });
          setTitle("");
          setText("");
          setCategory("");
          navigate(-1);
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FormContainer onSubmit={onSubmitText}>
            <TitleContainer>
              <div>
                <img src="/image/icon/ditto_icon.png" alt="메타" />
                <h2>글 작성하기</h2>
              </div>
              {!currentUser ? (
                <></>
              ) : (
                <MiddleButton fontcolor="var(--color-prime)" btncolor="var(--grass)" onClick={HandleNav(navigate, -1)}>
                  글 리스트로
                </MiddleButton>
              )}
            </TitleContainer>
            <HeaderContainer>
              <Name>작성자 : {currentUser?.displayName}</Name>
              <DropdownContainer>
                <DropdownHeader onClick={toggleDropdown}>{category || "글머리를 설정해주세요"}</DropdownHeader>
                {isOpen && (
                  <DropdownListContainer ref={dropdownRef}>
                    <DropdownList>
                      <ListItem onClick={() => onCategoryClick("레이드")}>레이드</ListItem>
                      <ListItem onClick={() => onCategoryClick("체육관")}>체육관</ListItem>
                    </DropdownList>
                  </DropdownListContainer>
                )}
              </DropdownContainer>
            </HeaderContainer>
            <Label htmlFor="title">
              <Input
                type="text"
                name="title"
                value={title}
                onChange={onChangeTitle}
                placeholder="제목을 입력해주세요"
              />
            </Label>
            <Label htmlFor="text">
              <TextArea name="text" value={text} onChange={onChangeText} placeholder="글을 입력해주세요" />
            </Label>
            <NormalButton type="submit">글올리기</NormalButton>
          </FormContainer>
        </>
      )}
    </>
  );
}
export default TextForm;
