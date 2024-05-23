const onChangeInput = (
  event: React.FormEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>
) => {
  const {
    currentTarget: { value },
  } = event;
  setValue(value);
};

export default onChangeInput;
