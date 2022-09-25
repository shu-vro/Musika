import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconButton } from "@mui/material";
import disk from "@assets/disk.png";
import styles from "@styles/ControlPanel.module.scss";
import { useSelectMusic } from "@contexts/SelectMusic";
import { useMusicStore } from "@contexts/MusicStore";

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
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img
                src={selectedMusic?.picture?.["92x92"] || disk.src}
                alt={selectedMusic?.trackName || "track thumbnail"}
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
