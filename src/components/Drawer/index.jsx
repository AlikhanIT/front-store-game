import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Add, ChangeCircleOutlined, Comment, Help, Image, Settings, Smartphone} from "@mui/icons-material";
import {Link} from "react-router-dom";
import Cart from "../Cart";
import {useDispatch, useSelector} from "react-redux";
import {Divider} from "@mui/material";
import {changeStatus} from "../../redux/slices/helpSlice";
import {useEffect} from "react";
import {fetchPhone} from "../../redux/slices/phoneSlice";

export default function TemporaryDrawer({state, openBurger}) {
    const {isAdmin} = useSelector((state) => state.userReducer);
    const {phone} = useSelector((state) => state.phoneReducer);
    const dispatch = useDispatch();

    const onClickListItem = (setSettings) => {
        dispatch(changeStatus(setSettings));
        openBurger();
    }

    useEffect(() => {
        dispatch(fetchPhone());
    }, [])

    const list = () => (
        <Box sx={{width: 250, height: window.screen.height}} className=".container">
            <List>
                <ListItem disablePadding>
                    <Cart/>
                </ListItem>
            </List>
            {isAdmin ? (
                <List>
                    <Link to="/addPost" onClick={() => openBurger()} style={{textDecoration: "none"}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "yellow"}}>
                                    <Add/>
                                </ListItemIcon>
                                <Box sx={{color: "yellow"}}>
                                    <ListItemText primary="Добавить товар"/>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider/>
                    <Link to="/addHelp" onClick={() => onClickListItem(true)} style={{textDecoration: "none"}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "yellow"}}>
                                    <Add/>
                                </ListItemIcon>

                                <Box sx={{color: "yellow"}}>
                                    <ListItemText primary="Добавить помощь"/>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider/>
                    <Link to="/addhelp" onClick={() => onClickListItem(false)} style={{textDecoration: "none"}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "yellow"}}>
                                    <Add/>
                                </ListItemIcon>
                                <Box sx={{color: "yellow"}}>
                                    <ListItemText primary="Добавить инструкцию"/>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider/>
                    <Link to="/changeBack" onClick={() => onClickListItem(false)} style={{textDecoration: "none"}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "yellow"}}>
                                    <ChangeCircleOutlined/>
                                </ListItemIcon>
                                <Box sx={{color: "yellow"}}>
                                    <ListItemText primary="Изменить фон"/>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider/>
                    <Link to="/changeNews" onClick={() => onClickListItem(false)} style={{textDecoration: "none"}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "yellow"}}>
                                    <Image />
                                </ListItemIcon>
                                <Box sx={{color: "yellow"}}>
                                    <ListItemText primary="Изменить новости"/>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider/>
                    <Link to="/changePhone" onClick={() => onClickListItem(false)} style={{textDecoration: "none"}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "yellow"}}>
                                    <Smartphone />
                                </ListItemIcon>
                                <Box sx={{color: "yellow"}}>
                                    <ListItemText primary="Изменить телефон"/>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider/>
                </List>
            ) : (
                ""
            )}
            <Link to="/comments" onClick={() => onClickListItem(false)} style={{textDecoration: "none"}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{color: "yellow"}}>
                            <Comment/>
                        </ListItemIcon>
                        <Box sx={{color: "yellow"}}>
                            <ListItemText primary="Отзывы"/>
                        </Box>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/help" onClick={() => onClickListItem(false)} style={{textDecoration: "none"}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{color: "yellow"}}>
                            <Settings/>
                        </ListItemIcon>
                        <Box sx={{color: "yellow"}}>
                            <ListItemText primary="Инструкции"/>
                        </Box>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/help" onClick={() => onClickListItem(true)} style={{textDecoration: "none"}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{color: "yellow"}}>
                            <Help/>
                        </ListItemIcon>
                        <Box sx={{color: "yellow"}}>
                            <ListItemText primary="Помошь"/>
                        </Box>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider/>
            <a href={`tel:${phone}`} style={{textDecoration: "none"}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{color: "yellow"}}>
                            <Smartphone/>
                        </ListItemIcon>
                        <Box sx={{color: "yellow"}}>
                            <ListItemText primary={`${phone}`}/>
                        </Box>
                    </ListItemButton>
                </ListItem>
                <Divider/>
            </a>
        </Box>
    );

    return (
        <Drawer
            disableScrollLock={true}
            anchor="left"
            open={state}
            onClose={openBurger}
        >
            {list()}
        </Drawer>
    );
}
