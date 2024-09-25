import { SwiperContainer, SwiperContent } from "./swiper.style";
import img1 from "../../images/img1.jpg";
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg";
import img4 from "../../images/img4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

const IntroSwiper = () => {
  const swiperImages = [
    { id: 1, image: img1 },
    { id: 3, image: img3 },
    { id: 2, image: img2 },
    { id: 4, image: img4 },
  ];

  return (
    <SwiperContainer>
      <SwiperContent>
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
        >
          {swiperImages.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.image} alt="Swiper" className="slideImages" />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContent>
    </SwiperContainer>
  );
};

export default IntroSwiper;
