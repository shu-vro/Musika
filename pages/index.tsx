import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import Playlist from "@components/Index/Playlist";
import MainBody from "@components/MainBody";
import styles from "@styles/Home.module.scss";
import Songs from "@components/Index/Songs";
import GroupSlide from "@components/Index/GroupSlide";
import { IAudioOptionalMetadata } from "@ts/types";

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
            name: "Loved",
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

    return (
        <MainBody title="All Songs">
            <Swiper
                slidesPerView={5}
                centeredSlides
                onSwiper={setSwiperThumb}
                touchAngle={30}
                onInit={swiper => {
                    setTimeout(() => {
                        if (!location) return;
                        let i = navigation.findIndex(
                            e => "#" + e.name === location.hash
                        );
                        if (i > -1 && !swiper.destroyed) swiper?.slideTo(i);
                    }, 1500);
                }}
                onActiveIndexChange={e => {
                    location.hash = e.slides[e.activeIndex].textContent;
                    swiper?.slideTo(e.activeIndex);
                }}
                className={styles.mySwiperThumb}
            >
                {navigation.map((topic, i) => (
                    <SwiperSlide
                        key={i}
                        onClick={() => {
                            swiper?.slideTo(i);
                            swiperThumb?.slideTo(i);
                        }}
                    >
                        {topic.name}
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                className={styles.mySwiperContainer}
                centeredSlides
                touchAngle={30}
                onInit={swiper => {
                    setTimeout(() => {
                        if (!location) return;
                        let i = navigation.findIndex(
                            e => "#" + e.name === location.hash
                        );
                        if (i > -1 && !swiper.destroyed) swiper?.slideTo(i);
                    }, 1500);
                }}
                onActiveIndexChange={e => {
                    swiperThumb?.slideTo(e.activeIndex);
                }}
                onSwiper={setSwiper}
            >
                <SwiperSlide>
                    <Playlist />
                </SwiperSlide>
                <SwiperSlide>
                    <Songs />
                </SwiperSlide>
                <SwiperSlide>
                    <Songs
                        filter={e =>
                            e.loved as unknown as IAudioOptionalMetadata
                        }
                    />
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
