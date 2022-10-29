import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconButton } from "@mui/material";
import disk from "@assets/disk.png";
import styles from "@styles/ControlPanel.module.scss";
import { useSelectMusic } from "@contexts/SelectMusic";
import { useMusicStore } from "@contexts/MusicStore";
import Image from "next/image";

export default function NameSection() {
    const { value: selectedMusic, setValue: setSelectedMusic } =
        useSelectMusic();
    const { setUsingId } = useMusicStore();

    function handleLoved() {
        if (selectedMusic?.loved === null || !selectedMusic?.id) return;
        setSelectedMusic(prev => {
            let temp = { ...prev };
            temp.loved = !temp.loved;
            setUsingId(selectedMusic.id, {
                loved: temp.loved,
            });
            return temp;
        });
    }
    return (
        <div className={styles["name-section"]}>
            <Image
                src={selectedMusic?.thumbnail?.["92x92"] || disk.src}
                alt={selectedMusic?.trackName || "track thumbnail"}
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
            <IconButton onClick={handleLoved}>
                {selectedMusic?.loved ? (
                    <AiFillHeart size="1.5rem" />
                ) : (
                    <AiOutlineHeart size="1.5rem" />
                )}
            </IconButton>
        </div>
    );
}
