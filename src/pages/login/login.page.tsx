import { BsGoogle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { useForm } from "react-hook-form";
import validator from "validator";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import CustomButton from "../../components/custom-button/custom.button.component";
import Header from "../../components/header/header.component";
import CustomInput from "../../components/custom-input/custom.input.component";
import InputErrorMessage from "../../components/input-error-message/input.error.message";
import Loading from "../../components/loading/loading.component";

// Styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
} from "./login.styles";

//Utilities
import { auth, db, googleProvider } from "../../config/firebase.config";
import { useAppSelector } from "../../hooks/redux.hook";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>();

  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer,
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log({ userCredentials });
    } catch (error) {
      const _error = error as AuthError;

      if (_error.code === AuthErrorCodes.INVALID_PASSWORD) {
        return setError("password", { type: "mismatch" });
      }
      if (_error.code === AuthErrorCodes.USER_DELETED) {
        return setError("email", { type: "userNotFound" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithGooglePress = async () => {
    try {
      setIsLoading(true);
      const userCredentials = await signInWithPopup(auth, googleProvider);

      const querySnapchot = await getDocs(
        query(
          collection(db, "users"),
          where("id", "==", userCredentials.user.uid),
        ),
      );
      const user = querySnapchot.docs[0]?.data();

      if (!user) {
        const firstName = userCredentials.user.displayName?.split(" ")[0];
        const lastName = userCredentials.user.displayName?.split(" ")[1];

        await addDoc(collection(db, "users"), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          firstName,
          lastName,
          provider: "google",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          <CustomButton
            startIcon={<BsGoogle size={18} />}
            onClick={handleSignInWithGooglePress}
          >
            Entrar com o Google
          </CustomButton>

          <LoginSubtitle>ou entre com seu e-mail</LoginSubtitle>

          <LoginInputContainer>
            <p>E-mail:</p>
            <CustomInput
              $hasError={!!errors?.email}
              placeholder="Digite seu e-mail..."
              {...register("email", {
                required: true,
                validate: (value) => validator.isEmail(value),
              })}
            />
            {errors?.email?.type === "required" && (
              <InputErrorMessage>O e-mail é obrigatório!</InputErrorMessage>
            )}
            {errors?.email?.type === "userNotFound" && (
              <InputErrorMessage>
                Não existe um usuário com esse email
              </InputErrorMessage>
            )}
            {errors?.email?.type === "validate" && (
              <InputErrorMessage>Insira um e-mail válido!</InputErrorMessage>
            )}
          </LoginInputContainer>

          <LoginInputContainer>
            <p>Senha:</p>
            <CustomInput
              $hasError={!!errors?.password}
              placeholder="Digite sua senha..."
              type="password"
              {...register("password", { required: true })}
            />
            {errors?.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatória!</InputErrorMessage>
            )}
            {errors?.password?.type === "mismatch" && (
              <InputErrorMessage>Senha inválida</InputErrorMessage>
            )}
          </LoginInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default LoginPage;
