import React, {useEffect, useState} from "react";

import {SideBlock} from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import styles from "./Help.module.scss";
import {IconButton, Typography} from "@mui/material";
import {Clear, Edit} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {fetchComments, fetchDeleteComment} from "../redux/slices/commentSlice";
import {AddComment} from "./AddComment";
import {BACK_URL} from "../redux/http";

export const CommentsBlock = () => {
    const dispatch = useDispatch();
    const {items, isLoading} = useSelector(state => state.commentReducer);
    const {isAuth, isAdmin, userId} = useSelector(state => state.userReducer);
    const [text, setText] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        dispatch(fetchComments());
    }, []);

    const onClickEdit = (txt, ids) => {
        setText(txt);
        setId(ids);
    }

    return (<SideBlock title="Отзывы">
        {isAuth ? <AddComment txt={text} id={id} setId={setId} setTxt={setText}/> : ""}
        <List>
            {(isLoading ? [...Array(5)] : items).map((obj, index) => (<div className={styles.root} key={index}>
                <ListItem sx={{m: 1, backgroundColor: " #1C1C1C"}} alignItems="flex-start">
                    <ListItemAvatar>
                        {isLoading ? (<Skeleton variant="circular" width={40} height={40}/>) : (
                            <Avatar alt={obj.user.name} src={`${BACK_URL}${obj.user.imageUrl}`}/>)}
                    </ListItemAvatar>
                    {isLoading ? (<div style={{display: "flex", flexDirection: "column"}}>
                        <Skeleton variant="text" height={25} width={120}/>
                        <Skeleton variant="text" height={18} width={230}/>
                    </div>) : (<ListItemText
                        primary={obj.user.name}
                        secondary={`⠀⠀${obj.text}`}
                    />)}
                    {isAdmin || (userId == obj?.user._id) ? <div className={styles.editButtons}>
                        <IconButton color="primary" onClick={() => {
                            onClickEdit(obj.text, obj._id)
                        }}>
                            <Edit/>
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setText("")
                                return dispatch(fetchDeleteComment(obj._id));
                            }}
                            color="secondary"
                        >
                            <Clear/>
                        </IconButton>
                    </div> : ""}
                </ListItem>
                <Divider variant="inset" component="li"/>
            </div>))}
            {
                items.length === 0 ? <Typography sx={{mt: 3, mb: 3, backgroundColor: " #1C1C1C"}} variant={"h5"} textAlign={"center"}>Пока отзывов нет, будьте первыми</Typography> : ""
            }
        </List>
    </SideBlock>);
};
