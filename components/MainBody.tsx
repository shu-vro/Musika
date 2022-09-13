import { useEffect } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import styles from "@styles/MainBody.module.scss";
import { useShrinkNavigation } from "@contexts/shrinkNavigation";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import styled from "@emotion/styled";

const MyIconButton = styled(IconButton)({
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: `50%`,
    padding: `10px`,
    margin: `10px`,
    cursor: `pointer`,
    color: `var(--color)`,
});

export default function MainBody({ children, title }) {
    const shrinkNavigation = useShrinkNavigation();
    const rippleRefresh = useRippleRefresh();
    let router = useRouter();

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
                <div className={styles.topNav}>
                    <MyIconButton
                            onClick={() => {
                                router.back();
                            }}>
                        <RiArrowGoBackLine
                            size="1.5rem"
                        />
                    </MyIconButton>
                    <h1>{title}</h1>
                </div>
                {children}
            </div>
        </>
    );
}
