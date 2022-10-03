import { useEffect, useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import styles from "@styles/MainBody.module.scss";
import { useShrinkNavigation } from "@contexts/shrinkNavigation";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import SearchResults from "./SearchResults";
import MyTooltip from "./Index/MyTooltip";
import MyIconButton from "./MyIconButton";

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
                    <MyTooltip title="Go Back" placement="bottom">
                        <MyIconButton
                            onClick={() => {
                                router.back();
                            }}
                        >
                            <RiArrowGoBackLine size="1.5rem" />
                        </MyIconButton>
                    </MyTooltip>
                    <h1>{title}</h1>
                    <MyTooltip title="Search" placement="bottom">
                        <MyIconButton
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            <BsSearch size="1.5rem" />
                        </MyIconButton>
                    </MyTooltip>
                </div>
                {children}
                <SearchResults open={open} setOpen={setOpen} />
            </div>
        </>
    );
}
