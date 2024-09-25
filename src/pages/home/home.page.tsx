//Components
import Categories from "../../components/categories/categories.component";
import Header from "../../components/header/header.component";
import IntroSwiper from "../../components/swiper/swiper.component";

const HomePage = () => {
  return (
    <>
      <Header />
      <IntroSwiper />
      <Categories />
    </>
  );
};

export default HomePage;
