import { onAuthStateChanged } from "firebase/auth";
import { FunctionComponent, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getDocs, query, collection, where } from "firebase/firestore";

// Pages
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SignUpPage from "./pages/sign-up/sign.up.page";
import ExplorePage from "./pages/explorer/explorer.page";
import CategoryDetailsPage from "./pages/categories-details/categories.details.page";
import CheckOutPage from "./pages/checkout/checkout.page";

// Utilities
import { auth, db } from "./config/firebase.config";
import { UserContext } from "./contexts/user.context";
import { userConverter } from "./converters/firestore.converter";

// Components
import Loading from "./components/loading/loading.component";
import Cart from "./components/cart/cart.components";
import AuthenticationGuard from "./guards/authentication.guard";
import PaymentConfirmationPage from "./pages/payment-confirmation/payment.confirmation.page";

const App: FunctionComponent = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext);

  onAuthStateChanged(auth, async (user) => {
    const isSignOut = isAuthenticated && !user;
    if (isSignOut) {
      logoutUser();
      return setIsInitializing(false);
    }

    const isSignIn = !isAuthenticated && user;

    if (isSignIn) {
      const querySnapchot = await getDocs(
        query(
          collection(db, "users").withConverter(userConverter),
          where("id", "==", user.uid),
        ),
      );

      const userFromFirestore = querySnapchot.docs[0]?.data();
      loginUser(userFromFirestore);
      return setIsInitializing(false);
    }

    return setIsInitializing(false);
  });

  if (isInitializing) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/category/:id" element={<CategoryDetailsPage />} />
        <Route
          path="/checkout"
          element={
            <AuthenticationGuard>
              <CheckOutPage />
            </AuthenticationGuard>
          }
        />
        <Route
          path="/payment-confirmation"
          element={<PaymentConfirmationPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>

      <Cart />
    </BrowserRouter>
  );
};

export default App;
