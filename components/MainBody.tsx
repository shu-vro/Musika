import React, { useEffect } from "react";
import styles from "@styles/MainBody.module.scss";
import { useShrinkNavigation } from "@contexts/shrinkNavigation";
import { useRippleRefresh } from "@contexts/RippleRefresh";

export default function MainBody({ children, title }) {
    const shrinkNavigation = useShrinkNavigation();
    const rippleRefresh = useRippleRefresh();
    useEffect(() => {
        rippleRefresh.refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
