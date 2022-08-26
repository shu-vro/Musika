import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import disk from "../../assets/disk.png";
import styles from "@styles/ControlPanel.module.scss";

export default function NameSection() {
    return (
        <div className={styles["name-section"]}>
            <Image src={disk} alt="" width={80} height={80} />
            <div className={styles.details}>
                {/* @ts-ignore */}
                <marquee behavior="scroll" direction="left">
                    Some amazing Track
                    {/* @ts-ignore */}
                </marquee>
                <p>Some amazing artist</p>
            </div>
            <AiOutlineHeart size={"1.5rem"} className={styles.love_icon} />
        </div>
    );
}
