import { InputType } from "../types/types";

function Input({
  type = "text",
  value,
  placeholder,
  name,
  onChange,
}: InputType) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  );
}

export default Input;
