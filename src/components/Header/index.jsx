import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Container} from "@mui/material";
import MyDrawer from '../Drawer';
import {Link} from "react-router-dom";
import styles from "./Header.module.scss";
import Login from "../../pages/Login";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogout} from "../../redux/slices/userSlice";
import {useEffect, useRef} from "react";

export default function Header() {
  const [burgerOpen, setBurgerOpen] = React.useState(false);
  const [openPopupLogin, setOpenPopUpLogin] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isReg, setIsReg] = React.useState(true);
  const {isAuth} = useSelector(state => state.userReducer);
  const {items} = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted) {
      window.localStorage.setItem("cart", JSON.stringify(items));
    }
    isMounted.current = true;
  }, [items])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (register = true) => () => {
    setAnchorElUser(null);
    setIsReg(register);
    handleClickOpenLoginPopUp();
  };

  const handleCloseMenu = () => {
    setOpenPopUpLogin(false);
    setAnchorElUser(null);
  };

  const handleClickOpenLoginPopUp = () => {
    setOpenPopUpLogin(true);
  };
  const handleCloseLoginPopUp = () => {
    setOpenPopUpLogin(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Box
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
              <MyDrawer state={burgerOpen} openBurger={() => setBurgerOpen(false)} />
              <MenuIcon onClick={() => setBurgerOpen(true)} sx={{cursor: "pointer"}}/>
            </Box>
            <Link className={styles.logo} to="/">
              <div>GAMES4PS</div>
            </Link>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                  disableScrollLock={true}
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseMenu}
              >
                {
                  isAuth
                      ? (
                          <MenuItem onClick={() => {dispatch(fetchLogout());handleCloseMenu();}}>
                            <Typography textAlign="center">Выйти</Typography>
                          </MenuItem>
                      )
                      : (
                          <div>
                            <MenuItem onClick={handleCloseUserMenu(false)}>
                              <Typography textAlign="center">Войти</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu(true)}>
                              <Typography textAlign="center">Зарегестрироваться</Typography>
                            </MenuItem>
                            <Login register={isReg} open={openPopupLogin} handleClose={handleCloseLoginPopUp}/>
                          </div>
                      )
                }
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
