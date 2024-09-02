import { FunctionComponent, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Header from "../components/header/header.component";
import Loading from "../components/loading/loading.component";
import { useSelector } from "react-redux";

interface AuthenticationGuardProps {
  children: ReactNode;
}

const AuthenticationGuard: FunctionComponent<AuthenticationGuardProps> = ({
  children,
}) => {
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading message="Você precisa estar logado para acessar esta página. Você será redirecionado para a página de login em intantes... " />
      </>
    );
  }

  return <>{children}</>;
};

export default AuthenticationGuard;
