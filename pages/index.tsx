import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Playlist from "@components/Index/Playlist";
import MainBody from "@components/MainBody";
import styles from "@styles/Home.module.scss";
import Songs from "@components/Index/Songs";
import GroupSlide from "@components/Index/GroupSlide";

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
        {
            name: "Genre",
        },
    ];

    useEffect(() => {
        if (!location) return;
        let i = navigation.findIndex(e => "#" + e.name === location.hash);
        if (i > -1) {
            swiper?.slideTo(i);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainBody title="Play List">
            <Swiper
                slidesPerView={3}
                centeredSlides
                onSwiper={setSwiperThumb}
                onActiveIndexChange={e => {
                    location.hash = e.slides[e.activeIndex].textContent;
                    swiper.slideTo(e.activeIndex);
                }}
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
                onActiveIndexChange={e => {
                    swiperThumb.slideTo(e.activeIndex);
                }}
                onSwiper={setSwiper}>
                <SwiperSlide>
                    <Playlist />
                </SwiperSlide>
                <SwiperSlide>
                    <Songs />
                </SwiperSlide>
                <SwiperSlide>
                    <GroupSlide slideName="artist" />
                </SwiperSlide>
                <SwiperSlide>
                    <GroupSlide slideName="album" />
                </SwiperSlide>
                <SwiperSlide>
                    <GroupSlide slideName="genre" />
                </SwiperSlide>
            </Swiper>
        </MainBody>
    );
}
