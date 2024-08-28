import { FiLogIn } from "react-icons/fi";
import validator from "validator";
import { useForm } from "react-hook-form";
import {
  AuthError,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import CustomButton from "../../components/custom-button/custom.button.component";
import CustomInput from "../../components/custom-input/custom.input.component";
import Header from "../../components/header/header.component";
import InputErrorMessage from "../../components/input-error-message/input.error.message";
import Loading from "../../components/loading/loading.component";

// Styles
import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer,
} from "./sign.up.style";

//Utilities
import { auth, db } from "../../config/firebase.config";
import { UserContext } from "../../contexts/user.context";
interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>();

  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleSubmitPress = async (data: SignUpForm) => {
    try {
      setIsLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await addDoc(collection(db, "users"), {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        provider: "firebase",
      });
    } catch (error) {
      const _error = error as AuthError;

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError("email", { type: "alreadyInUse" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const watchPassword = watch("password");

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Crie a sua conta</SignUpHeadline>
          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              placeholder="Digite seu nome"
              $hasError={!!errors?.firstName}
              {...register("firstName", {
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
              $hasError={!!errors?.lastName}
              {...register("lastName", {
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
            {errors?.email?.type === "alreadyInUse" && (
              <InputErrorMessage>
                Este e-mail já está sendo utilizado
              </InputErrorMessage>
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
                minLength: 6,
              })}
            />

            {errors?.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
            )}
            {errors?.password?.type === "minLength" && (
              <InputErrorMessage>
                A senha precisa ter no mínimo 6 caracteres
              </InputErrorMessage>
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
                minLength: 6,
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
            {errors?.password?.type === "minLength" && (
              <InputErrorMessage>
                A senha precisa ter no mínimo 6 caracteres
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
