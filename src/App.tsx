import { onAuthStateChanged } from "firebase/auth";
import { FunctionComponent, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getDocs, query, collection, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// Pages
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SignUpPage from "./pages/sign-up/sign.up.page";
import ExplorePage from "./pages/explorer/explorer.page";
import CategoryDetailsPage from "./pages/categories-details/categories.details.page";
import CheckOutPage from "./pages/checkout/checkout.page";

// Utilities
import { auth, db } from "./config/firebase.config";
import { userConverter } from "./converters/firestore.converter";
import { loginUser, logoutUser } from "./store/reducers/user/user.action";

// Components
import Loading from "./components/loading/loading.component";
import Cart from "./components/cart/cart.components";
import AuthenticationGuard from "./guards/authentication.guard";
import PaymentConfirmationPage from "./pages/payment-confirmation/payment.confirmation.page";

const App: FunctionComponent = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer,
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSignOut = isAuthenticated && !user;
      if (isSignOut) {
        dispatch(logoutUser());
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

        dispatch(loginUser(userFromFirestore));
        return setIsInitializing(false);
      }

      return setIsInitializing(false);
    });
  }, [dispatch]);

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
