import React, {useEffect} from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import {Link, useParams} from "react-router-dom";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    setDefault,
} from "../redux/slices/postSlice";
import axios from "../redux/http/index";
import {Alert} from "@mui/material";
import {fetchCreateHelp, fetchCreateInstruct, fetchEditHelp, fetchEditInstruct} from "../redux/slices/helpSlice";

export const AddHelp = () => {
    const {isAdmin} = useSelector((state) => state.userReducer);
    const {status} = useSelector((state) => state.helpReducer);
    const dispatch = useDispatch();
    const {id} = useParams();
    const path = status ? "help" : "instruct";

    const [text, setText] = React.useState("");
    const [title, setTitle] = React.useState("");

    if (!isAdmin) {
        window.location.pathname = "/";
    }

    useEffect(() => {
        if (id) {
            axios
                .get(`${path}?id=${id}`)
                .then((res) => {
                    setText(res.data.description);
                    setTitle(res.data.title);
                })
                .catch((err) => {
                    console.warn(err);
                    alert("Ошибка при получении статьи");
                });
        }
    }, []);
    const onSubmit = async () => {
        if (id) {
            status ? dispatch(fetchEditHelp({
                id, title, description: text,
            })) : dispatch(fetchEditInstruct({
                id, title, description: text,
            }))
        } else {
            status ? dispatch(fetchCreateHelp({
                title, description: text,
            })) : dispatch(fetchCreateInstruct({
                title, description: text,
            }))
        }
        window.location.pathname = "/";
        dispatch(setDefault());
    };

    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);

    const describeField = status ? "Введите описание вида помощи..." : "Введите описание вида инструкции...";

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: "200px",
            autofocus: true,
            placeholder: describeField,
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        []
    );

    return (
        <Paper sx={{p: "30px", mt: 4, mb: 4,}}>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                value={title}
                name={"title"}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={status ? "Название вида помощи..." : "Название вида инструкции..."}
                fullWidth
            />
            <SimpleMDE
                className={styles.editor}
                value={text}
                onChange={onChange}
                options={options}
            />
            <div className={styles.buttons}>
                <Button
                    disabled={!title || !text}
                    onClick={() => (onSubmit())}
                    size="large"
                    variant="contained"
                >
                    {id ? "Сохранить" : "Опубликовать"}
                </Button>
                <Link style={{textDecoration: "none"}} to="/">
                    <Button size="large">Отмена</Button>
                </Link>
            </div>
            {!title || !text ?
                <Alert sx={{mt: 2}} severity={"info"} variant={"filled"}>Все поля обязательны</Alert> : ""}
        </Paper>);
};
