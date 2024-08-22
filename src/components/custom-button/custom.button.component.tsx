import { FunctionComponent, ReactNode, ButtonHTMLAttributes } from "react";

// Styles
import { CustomButtonContainer, IconContainer } from "./custom.button.style";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  loginIcon?: ReactNode;
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  children,
  loginIcon,
  ...rest
}) => {
  return (
    <CustomButtonContainer {...rest}>
      {loginIcon && <IconContainer>{loginIcon}</IconContainer>}
      {children}
    </CustomButtonContainer>
  );
};

export default CustomButton;
