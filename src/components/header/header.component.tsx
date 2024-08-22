import { BsCart3 } from "react-icons/bs";

// Styles
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";
import { Link } from "react-router-dom";
import LoginPage from "../../pages/login/login.page";
import Colors from "../../theme/theme.colors";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>COSMO APPAREL</HeaderTitle>

      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <Link
          to="/login"
          style={{ textDecoration: "none", color: `${Colors.text.white} ` }}
        >
          <HeaderItem>Login</HeaderItem>
        </Link>
        <HeaderItem>Criar conta</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} /> <p style={{ marginLeft: 5 }}> 5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
