import { BsGoogle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";

// Components
import CustomButton from "../../components/custom-button/custom.button.component";
import Header from "../../components/header/header.component";

// Styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
} from "./login.styles";
import CustomInput from "../../components/custom-input/custom.component";

const LoginPage = () => {
  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>
          <CustomButton loginIcon={<BsGoogle size={18} />}>
            Entrar com o Google
          </CustomButton>

          <LoginSubtitle>ou entre com seu e-mail</LoginSubtitle>

          <LoginInputContainer>
            <CustomInput placeholder="Digite seu e-mail..." />
          </LoginInputContainer>
          <LoginInputContainer>
            <CustomInput placeholder="Digite sua senha..." />
          </LoginInputContainer>
          <CustomButton loginIcon={<FiLogIn size={18} />}>Entrar</CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default LoginPage;
