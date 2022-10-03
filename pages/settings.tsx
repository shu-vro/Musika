import MyTooltip from "@components/Index/MyTooltip";
import {
    Checkbox,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
} from "@mui/material";
import styles from "@styles/Settings.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";
import { MdExpandMore } from "react-icons/md";
import MyIconButton from "@components/MyIconButton";

export default function Settings() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className={styles.settings}>
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
                    <h1>Settings</h1>
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
                <Field
                    checked={true}
                    title="Set in cache storage"
                    description="If checked, your songs will be saved into cache storage.
                        Or else you have to upload them each and every time.
                        Will consume disk space. For better performance, check
                        this."
                />
            </div>
        </>
    );
}

function Field({ checked = false, title, description, cb = newValue => null }) {
    return (
        <div className={styles.field}>
            <Checkbox
                sx={{
                    color: `var(--color)`,
                    "&.MuiCheckbox-root.Mui-checked": {
                        color: `var(--theme)`,
                    },
                }}
                defaultChecked={checked}
                onChange={e => {
                    cb(e.target.checked);
                }}
            />
            <Accordion
                sx={{
                    background: "transparent",
                    color: `var(--color)`,
                    boxShadow: "none",
                    width: `100%`,
                }}
            >
                <AccordionSummary
                    expandIcon={
                        <MdExpandMore size="1.5rem" fill="var(--color)" />
                    }
                >
                    {title}
                </AccordionSummary>
                <AccordionDetails>{description}</AccordionDetails>
            </Accordion>
        </div>
    );
}
