import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import disk from "@assets/disk.png";
import styles from "@styles/ControlPanel.module.scss";
import { useSelectMusic } from "@contexts/SelectMusic";

export default function NameSection() {
    const { value: selectedMusic, setValue: setSelectedMusic } =
        useSelectMusic();

    function handleLoved() {
        if (selectedMusic?.loved === null) return;
        setSelectedMusic(prev => {
            let temp = { ...prev };
            temp.loved = !temp.loved;
            return temp;
        });
    }
    return (
        <div className={styles["name-section"]}>
            <Image
                src={selectedMusic?.picture || disk}
                alt=""
                layout="fixed"
                width={80}
                height={80}
            />
            <div className={styles.details}>
                {/* @ts-ignore */}
                <marquee behavior="scroll" direction="left">
                    {selectedMusic?.trackName}
                    {/* @ts-ignore */}
                </marquee>
                <p>{selectedMusic?.artist}</p>
            </div>
            {selectedMusic?.loved ? (
                <AiFillHeart
                    size="1.5rem"
                    className={styles.love_icon}
                    onClick={handleLoved}
                />
            ) : (
                <AiOutlineHeart
                    size="1.5rem"
                    className={styles.love_icon}
                    onClick={handleLoved}
                />
            )}
        </div>
    );
}
