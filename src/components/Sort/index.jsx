import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Box} from "@mui/material";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {setAsc, setSort} from "../../redux/slices/postSlice";
import styles from "./Sort.module.scss";

export const sortList = [{
    sortName: 'популяронсти',
    activeProp: 0,
    sortProp: 'viewsCount',
    sortMath: true
},{
    sortName: 'цене',
    activeProp: 1,
    sortProp: 'price',
    sortMath: true
},{
    sortName: 'алфавиту',
    activeProp: 2,
    sortProp: 'title',
    sortMath: true
}]

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function Sort() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {asc} = useSelector(state => state.postReducer)
    const [sorts, setSorts] = React.useState(sortList[1]);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAsc = () => {
        if(asc === 1) {
            dispatch(setAsc(false));
        } else {
            dispatch(setAsc(true));
        }
    };

    const handleClose = (sortType) => {
        setSorts(sortType);
        dispatch(setSort(sortType.sortProp));
        setAnchorEl(null);
    };

    return (
        <Box sx={{position: "relative", mb: 3}} width="100%" height={36}>
            <Box sx={{display: "flex", position: "absolute"}} className={styles.button} >
                <Button
                    sx={{position: "relative", left: 18, width: "10px"}}
                    id="demo-customized-button"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={handleAsc}
                    disableElevation
                >
                    {asc === 1
                        ? <KeyboardArrowDown />
                        : <KeyboardArrowUp />}

                </Button>
                <Button
                    sx={{height: "36px", whiteSpace: "nowrap"}}
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                >
                    {`Сортировка по ${sorts.sortName}`}
                </Button>
                <StyledMenu
                    disableScrollLock={true}
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => handleClose(sorts)}
                >
                    {sortList.map((obj, i) =>
                        <MenuItem onClick={() => {handleClose(obj)}} key={i} disableRipple>
                            {obj.sortName}
                        </MenuItem>
                    )}
                </StyledMenu>
            </Box>
        </Box>
    );
}