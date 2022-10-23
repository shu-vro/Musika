import {
    Checkbox,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    Tooltip,
    Drawer,
} from "@mui/material";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";
import { BsSearch, BsLink45Deg } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";
import { MdExpandMore } from "react-icons/md";
import styles from "@styles/Settings.module.scss";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TreeView from "@mui/lab/TreeView";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";
import TreeItem, { TreeItemContentProps, useTreeItem } from "@mui/lab/TreeItem";
import { FaBars } from "react-icons/fa";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import Link from "next/link";
import { ISetting, TSettingsArray } from "@ts/types";

const drawerWidth = 240;

export default function Settings() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();
    const { refresh } = useRippleRefresh();
    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const renderTree = (nodes: TSettingsArray) =>
        nodes.map(node => (
            <TreeItem key={node.title} nodeId={node.title} label={node.title}>
                {node.settings.map(setting => (
                    <TreeItem
                        key={setting.title}
                        nodeId={setting.title}
                        label={setting.title}
                        onClick={() => {
                            location.hash = normalizeId(setting.title);
                        }}
                    ></TreeItem>
                ))}
            </TreeItem>
        ));

    var allSettings: TSettingsArray = [
        {
            title: "Upload Files",
            settings: [
                {
                    title: "Set in cache storage",
                    description: `If checked, your songs will be saved into cache storage.
             Or else you have to upload them each and every time.
             Will consume disk space. For better performance, check
             this.`,
                    operation: {
                        checked: true,
                    },
                    callback: () => null,
                },
            ],
        },
        {
            title: "Something I have to think",
            settings: [
                {
                    title: "Auto fetch lyrics",
                    description: `Automatically fetch lyrics. This will drain performance for the first time and increase the load time of track. But it's going to ease the loading time for lyrics fetcher`,
                    operation: {
                        checked: false,
                    },
                    callback: () => null,
                },
            ],
        },
    ];

    const drawer = (
        <div>
            <Link href="/" passHref>
                <a className={styles.logo}>MUSIKA</a>
            </Link>
            <Divider />
            <TreeView
                aria-label="multi-select"
                defaultCollapseIcon={<AiOutlineDown />}
                defaultExpandIcon={<AiOutlineRight />}
                multiSelect
                sx={{
                    flexGrow: 1,
                    maxWidth: 400,
                    fontSize: "18px",
                    overflowY: "auto",
                }}
            >
                {renderTree(allSettings)}
            </TreeView>
        </div>
    );

    return (
        <div className={styles.settings}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            background: `rgba(255, 255, 255, .3)`,
                            backdropFilter: "blur(5px)",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            background: `rgba(255, 255, 255, .3)`,
                            backdropFilter: "blur(5px)",
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    position: "relative",
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <div className={styles.topNav}>
                    <div>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            sx={{ display: { sm: "none" } }}
                        >
                            <FaBars />
                        </IconButton>
                        <Tooltip title="Go Back" placement="bottom">
                            <IconButton
                                onClick={() => {
                                    router.push("/");
                                }}
                            >
                                <RiArrowGoBackLine size="1.5rem" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <h1>Settings</h1>
                    <Tooltip title="Search" placement="bottom">
                        <IconButton
                            onClick={() => {
                                //  setOpen(true);
                            }}
                        >
                            <BsSearch size="1.5rem" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className={styles.fields}>
                    {allSettings.map(categories => (
                        <div
                            id={normalizeId(categories.title)}
                            key={categories.title}
                        >
                            <a
                                href={`#${normalizeId(categories.title)}`}
                                className={styles.categoryName}
                            >
                                {categories.title} <BsLink45Deg />
                            </a>
                            {categories.settings.map(setting => (
                                <Field
                                    key={setting.title}
                                    checked={setting.operation.checked}
                                    title={setting.title}
                                    description={setting.description}
                                    cb={setting.callback}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </Box>
        </div>
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
