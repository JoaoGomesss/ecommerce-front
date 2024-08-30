import { FunctionComponent, ReactNode, ButtonHTMLAttributes } from "react";

// Styles
import { CustomButtonContainer, IconContainer } from "./custom.button.style";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  startIcon?: ReactNode;
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  children,
  startIcon,
  ...rest
}) => {
  return (
    <CustomButtonContainer {...rest}>
      {startIcon && <IconContainer>{startIcon}</IconContainer>}
      {children}
    </CustomButtonContainer>
  );
};

export default CustomButton;
