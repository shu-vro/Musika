import React from "react";
import styles from "@styles/ControlPanel.module.scss";
import NameSection from "./NameSection";
import ControlSection from "./ControlSection";
import VolumeSection from "./VolumeSection";

export default function ControlPanel() {
    return (
        <div className={`${styles.controls}`}>
            <NameSection />
            <ControlSection />
            <VolumeSection />
        </div>
    );
}
