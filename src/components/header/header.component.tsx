import { useDispatch } from "react-redux";
import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.config";

// Styles
import {
  HeaderContainer,
  HeaderItems,
  HeaderItem,
  HeaderTitle,
} from "./header.styles";

// Utilities
import { logoutUser } from "../../store/toolkit/user/user.slice";
import { toggleCart } from "../../store/toolkit/cart/cart.slice";
import { useAppSelector } from "../../hooks/redux.hook";
import { selectProductsCount } from "../../store/reducers/cart/cart.selector";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer,
  );

  const productsCount = useAppSelector(selectProductsCount);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/sign-up");
  };

  const handleExploreClick = () => {
    navigate("/explore");
  };

  const handleSignOutClick = () => {
    dispatch(logoutUser());
    signOut(auth);
  };

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleLogoClick}>COSMO APPAREL</HeaderTitle>

      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>

        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
          </>
        )}

        {isAuthenticated && (
          <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
        )}

        <HeaderItem onClick={handleCartClick}>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
