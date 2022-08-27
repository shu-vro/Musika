import React from "react";
import styles from "@styles/MainBody.module.scss";
import { useShrinkNavigation } from "@contexts/shrinkNavigation";

export default function MainBody({ children, title }) {
    const shrinkNavigation = useShrinkNavigation();
    return (
        <>
            <div
                className={`${styles["main-body"]} ${
                    shrinkNavigation.value ? styles.shrink : ""
                }`}>
                <h1>{title}</h1>
                {children}
            </div>
        </>
    );
}
