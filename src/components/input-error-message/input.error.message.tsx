import { FunctionComponent } from "react";

// Styles
import { InputErrorMessageContainer } from "./input.error.message.style";

interface InputErrorMessageProps {
  children: string;
}

const InputErrorMessage: FunctionComponent<InputErrorMessageProps> = ({
  children,
}) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>;
};

export default InputErrorMessage;
