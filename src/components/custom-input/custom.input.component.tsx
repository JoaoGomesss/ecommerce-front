import { FunctionComponent, InputHTMLAttributes } from "react";

// Styles
import { CustomInputContainer } from "./custom.input.style";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const CustomInput: FunctionComponent<CustomInputProps> = ({
  hasError,
  ...rest
}) => {
  return (
    <CustomInputContainer hasError={hasError} {...rest}></CustomInputContainer>
  );
};

export default CustomInput;
