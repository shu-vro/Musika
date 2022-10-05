import { useEffect, useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import styles from "@styles/MainBody.module.scss";
import { useShrinkNavigation } from "@contexts/shrinkNavigation";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import SearchResults from "./SearchResults";
import Tooltip from "@mui/material/Tooltip";

export default function MainBody({ children, title }) {
    const [open, setOpen] = useState(false);
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
                }`}
            >
                <div className={styles.topNav}>
                    <Tooltip title="Go Back" placement="bottom">
                        <IconButton
                            onClick={() => {
                                router.back();
                            }}
                        >
                            <RiArrowGoBackLine size="1.5rem" />
                        </IconButton>
                    </Tooltip>
                    <h1>{title}</h1>
                    <Tooltip title="Search" placement="bottom">
                        <IconButton
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            <BsSearch size="1.5rem" />
                        </IconButton>
                    </Tooltip>
                </div>
                {children}
                <SearchResults open={open} setOpen={setOpen} />
            </div>
        </>
    );
}
