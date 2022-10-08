import {
    Checkbox,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    Tooltip,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";
import { MdExpandMore } from "react-icons/md";
import styles from "@styles/Settings.module.scss";

export default function Settings() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className={styles.settings}>
                <div className={styles.topNav}>
                    <Tooltip title="Go Back" placement="bottom">
                        <IconButton
                            onClick={() => {
                                router.push("/");
                            }}
                        >
                            <RiArrowGoBackLine size="1.5rem" />
                        </IconButton>
                    </Tooltip>
                    <h1>Settings</h1>
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
                <div className={styles.settingSection}>
                    <ul className={styles.sideNav}>
                        <li>
                            <a href="#">Just for the meme</a>
                        </li>
                        <li>
                            <a href="#">Just for the meme</a>
                        </li>
                        <li>
                            <a href="#">Just for the meme</a>
                        </li>
                        <li>
                            <a href="#">Just for the meme</a>
                        </li>
                    </ul>
                    <div className={styles.fields}>
                        <Field
                            checked={true}
                            title="Set in cache storage"
                            description="If checked, your songs will be saved into cache storage.
                        Or else you have to upload them each and every time.
                        Will consume disk space. For better performance, check
                        this."
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

function normalizeId(title: string) {
    return title.toLowerCase().replaceAll(" ", "_");
}

function Field({ checked, title, description, cb = newValue => null }) {
    return (
        <div className={styles.field} id={normalizeId(title)}>
            {checked !== undefined && (
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
                    centerRipple={false}
                />
            )}
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
