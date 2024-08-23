import { FiLogIn } from "react-icons/fi";
import validator from "validator";
import { useForm } from "react-hook-form";

// Components
import CustomButton from "../../components/custom-button/custom.button.component";
import CustomInput from "../../components/custom-input/custom.input.component";
import Header from "../../components/header/header.component";

// Styles
import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer,
} from "./sign.up.style";
import InputErrorMessage from "../../components/input-error-message/input.error.message";

interface SignUpForm {
  name: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>();

  const handleSubmitPress = (data: SignUpForm) => {
    console.log({ data });
  };

  const watchPassword = watch("password");

  return (
    <>
      <Header />
      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Crie a sua conta</SignUpHeadline>
          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              placeholder="Digite seu nome"
              $hasError={!!errors?.name}
              {...register("name", {
                required: true,
              })}
            />
            {errors?.password?.type === "required" && (
              <InputErrorMessage>A nome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              placeholder="Digite seu sobrenome"
              $hasError={!!errors?.lastname}
              {...register("lastname", {
                required: true,
              })}
            />
            {errors?.password?.type === "required" && (
              <InputErrorMessage>O sobrenome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>E-mail</p>
            <CustomInput
              placeholder="Digite seu e-mail"
              $hasError={!!errors?.email}
              {...register("email", {
                required: true,
                validate: (value) => validator.isEmail(value),
              })}
            />

            {errors?.email?.type === "required" && (
              <InputErrorMessage>O e-mail é obrigatório</InputErrorMessage>
            )}
            {errors?.email?.type === "validate" && (
              <InputErrorMessage>Insira um e-mail válido</InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              placeholder="Digite sua senha"
              type="password"
              $hasError={!!errors?.password}
              {...register("password", {
                required: true,
              })}
            />

            {errors?.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Confirmação de Senha</p>
            <CustomInput
              placeholder="Confirme sua senha"
              $hasError={!!errors?.passwordConfirmation}
              type="password"
              {...register("passwordConfirmation", {
                required: true,
                validate: (value) => {
                  return value === watchPassword;
                },
              })}
            />
            {errors?.passwordConfirmation?.type === "required" && (
              <InputErrorMessage>
                A confirmação da senha é obrigatória
              </InputErrorMessage>
            )}
            {errors?.passwordConfirmation?.type === "validate" && (
              <InputErrorMessage>
                As senhas precisam ser iguais
              </InputErrorMessage>
            )}
          </SignUpInputContainer>
          <CustomButton
            loginIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Criar sua conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  );
};

export default SignUpPage;
