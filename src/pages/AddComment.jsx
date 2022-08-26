import React, {useEffect} from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    setDefault,
} from "../redux/slices/postSlice";
import {Alert} from "@mui/material";
import {fetchCreateComment, fetchEditComment} from "../redux/slices/commentSlice";

export const AddComment = ({txt, id, setId, setTxt}) => {
    const dispatch = useDispatch();

    const [text, setText] = React.useState("");

    useEffect(() => {
        if (id) {
            setText(txt);
        }
    }, []);
    const onSubmit = async () => {
        if (id) {
            dispatch(fetchEditComment({
                id,
                text,
            }))
        } else {
            dispatch(fetchCreateComment({
                text,
                }
            ))
        }
        setTxt("");
        setText("");
        setId("");
        dispatch(setDefault());
    };

    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: "50px",
            autofocus: true,
            placeholder: "Введите ваш комментарий",
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        []
    );

    return (
        <Paper sx={{p: "0px 50px 0px 50px", color: "yellow"}}>
            <SimpleMDE
                className={styles.editor}
                value={txt}
                onChange={onChange}
                options={options}
            />
            <div className={styles.buttons}>
                <Button
                    disabled={!text}
                    onClick={() => (onSubmit())}
                    size="large"
                    variant="contained"
                >
                    {id ? "Сохранить" : "Опубликовать"}
                </Button>
                <Button onClick={() => setId("")} size="large">Отмена</Button>
            </div>
            {!text ?
                <Alert sx={{mt: 2}} severity={"info"} variant={"filled"}>Поле обязательно</Alert> : ""}
            <div style={{visibility: "hidden"}}>
                footer
            </div>
        </Paper>);
};
