import { useState, useEffect } from "react";
import styled from "styled-components";
import { HandleInputChange } from "../pages/Home";

export const boxShadow = "0 4px 6px rgb(32 33 36 / 28%)";
export const activeBordeRadius = "1rem 1rem 0 0";
export const inactiveBorderRadius = "1rem 1rem 1rem 1rem";

export const InputContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 165vmin;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border: 1px solid rgb(223, 225, 229);
  border-radius: ${(props) =>
    props.hasText ? activeBordeRadius : inactiveBorderRadius};
  z-index: 3;
  box-shadow: ${(props) => (props.hasText ? boxShadow : 0)};
  &:focus-within {
    box-shadow: ${boxShadow};
  }

  > input {
    flex: 1 0 0;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    font-size: 16px;
  }

  > div.delete-button {
    cursor: pointer;
  }
`;

export function Search({
  allCoins,
  // setAllCoins,
  // coins,
  setCoins,
  HandleInputChange,
  inputValue,
  setInputValue,
  hasText,
  setHasText,
}) {
  // input 참조해서 값이 없으면 setHasText에 false 재할당
  useEffect(() => {
    if (inputValue === "") {
      setHasText(false);
    }
  }, [inputValue]);

  // 인풋 창 옆 x버튼의 이벤트 핸들러 (렌더링 1번)
  const handleDeleteButtonClick = () => {
    // input 창 빈 값으로 바꾸기
    setInputValue("");
    setCoins(allCoins);
  };

  return (
    // 검색창
    <div className="input-container">
      <InputContainer hasText={hasText}>
        <input type="text" onChange={HandleInputChange} value={inputValue} />
        {/* &times는 곱하기 기호 */}
        <div
          className="delete-button"
          onClick={() => handleDeleteButtonClick()}
        >
          &times;
        </div>
      </InputContainer>
    </div>
  );
}
