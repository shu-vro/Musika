import React from "react";
import styles from "@styles/ControlPanel.module.scss";
import NameSection from "./NameSection";

export default function ControlPanel() {
    return (
        <div className={`${styles.controls}`}>
            <NameSection />
        </div>
    );
}
