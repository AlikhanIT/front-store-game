import React, {useEffect} from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import {useDispatch} from "react-redux";
import {
    setDefault,
} from "../redux/slices/postSlice";
import {Alert} from "@mui/material";
import {fetchCreatePhone} from "../redux/slices/phoneSlice";

export const ChangePhone = () => {
    const dispatch = useDispatch();

    const [text, setText] = React.useState("");

    const onSubmit = async () => {
        dispatch(fetchCreatePhone({
            text,
        }));
        setText("");
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
            placeholder: "Введите ваш номер",
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
                value={text}
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
                    Сохранить
                </Button>
                <Button onClick={() => window.location.pathname = "/"} size="large">Отмена</Button>
            </div>
            {!text ?
                <Alert sx={{mt: 2}} severity={"info"} variant={"filled"}>Поле обязательно</Alert> : ""}
            <div style={{visibility: "hidden"}}>
                footer
            </div>
        </Paper>);
};
