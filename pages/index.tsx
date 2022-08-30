import { Swiper, SwiperSlide } from "swiper/react";
import Playlist from "@components/Index/Playlist";
import MainBody from "@components/MainBody";
import styles from "@styles/Home.module.scss";
import Songs from "@components/Index/Songs";
import { useState } from "react";
import Artists from "@components/Index/Artists";

export default function Home() {
    const [swiper, setSwiper] = useState(null);
    const [swiperThumb, setSwiperThumb] = useState(null);
    let navigation = [
        {
            name: "PlayList",
        },
        {
            name: "Songs",
        },
        {
            name: "Artist",
        },
        {
            name: "Album",
        },
    ];
    return (
        <MainBody title="Play List">
            <Swiper
                slidesPerView={3}
                centeredSlides
                onSwiper={setSwiperThumb}
                className={styles.mySwiperThumb}>
                {navigation.map((topic, i) => (
                    <SwiperSlide
                        key={i}
                        onClick={() => {
                            swiper.slideTo(i);
                            swiperThumb.slideTo(i);
                        }}>
                        {topic.name}
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                className={styles.mySwiperContainer}
                centeredSlides
                touchAngle={30}
                onSwiper={setSwiper}>
                <SwiperSlide>
                    <Playlist />
                </SwiperSlide>
                <SwiperSlide>
                    <Songs />
                </SwiperSlide>
                <SwiperSlide>
                    <Artists />
                </SwiperSlide>
            </Swiper>
        </MainBody>
    );
}
