import { useState } from "react";
import { GiMusicalScore } from "react-icons/gi";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { CgArrowsShrinkH } from "react-icons/cg";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import styles from "@styles/ControlPanel.module.scss";
import RangeSlider from "./RangeSlider";
import { useSelectMusic } from "@contexts/SelectMusic";
import MoreButton from "../Index/MoreButton";
import QueueSlide from "@components/Control/QueueSlide";
import { MdQueueMusic } from "react-icons/md";
import MyTooltip from "@components/Index/MyTooltip";
import MyIconButton from "@components/MyIconButton";

export default function VolumeSection({ volume, setVolume, setActivateRange }) {
    const [openQueue, setOpenQueue] = useState(false);
    const router = useRouter();
    const { value: selectedMusic } = useSelectMusic();

    function navigate() {
        if (router.pathname === "/lyrics") {
            return router.back();
        }
        router.push({
            pathname: "/lyrics",
            query: {
                song: selectedMusic?.trackName ?? "",
                artist: selectedMusic?.artist ?? "",
                id: selectedMusic?.id ?? "",
                lyrics: selectedMusic?.lyrics ?? "",
            },
        });
    }
    let buttons = [
        {
            name: "Queue",
            icon: <MdQueueMusic size="1.3rem" />,
            cb: () => {
                setOpenQueue(true);
            },
        },
        {
            name: "Select Part",
            icon: <CgArrowsShrinkH size="1.3rem" />,
            cb: () => {
                setActivateRange(prev => !prev);
            },
        },
        {
            name: "Lyrics",
            icon: <GiMusicalScore size="1.3rem" />,
            cb: () => {
                navigate();
            },
        },
    ];

    return (
        <div className={styles["volume-section"]}>
            <MyTooltip title="Queue">
                <MyIconButton
                    onClick={() => {
                        setOpenQueue(true);
                    }}
                    className={styles.QueueButton}
                >
                    <MdQueueMusic size="2rem" />
                </MyIconButton>
            </MyTooltip>
            <MoreButton buttons={buttons} />
            <div className={styles.volume}>
                <MyIconButton
                    onClick={() => {
                        setVolume(prev => (prev !== 0 ? 0 : 100));
                    }}
                >
                    {volume === 0 ? (
                        <FiVolumeX size="1.5rem" />
                    ) : (
                        <FiVolume2 size="1.5rem" />
                    )}
                </MyIconButton>
                <RangeSlider
                    min={0}
                    max={100}
                    value={volume}
                    valueLabelDisplay="auto"
                    onChange={(e, n, a) => setVolume(Number(n))}
                />
            </div>
            <QueueSlide open={openQueue} setOpen={setOpenQueue} />
        </div>
    );
}
