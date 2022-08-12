import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Add} from "@mui/icons-material";
import {Link} from "react-router-dom";
import Cart from "../Cart";
import {useSelector} from "react-redux";

export default function TemporaryDrawer({state, openBurger}) {
    const { isAdmin } = useSelector(state => state.userReducer);

    const list = () => (
        <Box sx={{width: 250}} className=".container">
            <List>
                <ListItem disablePadding>
                        <Cart />
                </ListItem>
            </List>
            {
                isAdmin
                    ?
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Add />
                                </ListItemIcon>
                                <Link to="/addPost" style={{ textDecoration: 'none' }}>
                                    <Box sx={{ color: 'black'}}>
                                        <ListItemText primary="Добавить товар" />
                                    </Box>
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    :
                    ''
            }
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
