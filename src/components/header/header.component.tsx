import { BsCart3 } from "react-icons/bs";

// Styles
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";
import { Link } from "react-router-dom";
import Colors from "../../theme/theme.colors";

const Header = () => {
  return (
    <HeaderContainer>
      <Link
        to="/"
        style={{ textDecoration: "none", color: `${Colors.text.white} ` }}
      >
        <HeaderTitle>COSMO APPAREL</HeaderTitle>
      </Link>

      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <Link
          to="/login"
          style={{ textDecoration: "none", color: `${Colors.text.white} ` }}
        >
          <HeaderItem>Login</HeaderItem>
        </Link>
        <Link
          to="/signup"
          style={{ textDecoration: "none", color: `${Colors.text.white} ` }}
        >
          <HeaderItem>Criar conta</HeaderItem>
        </Link>
        <HeaderItem>
          <BsCart3 size={25} /> <p style={{ marginLeft: 5 }}> 5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
