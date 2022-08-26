import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {IconButton, Skeleton} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
    fetchDeleteHelp, fetchDeleteInstruct, fetchHelps, fetchInstructs
} from "../redux/slices/helpSlice";
import ReactMarkdown from 'react-markdown'
import styles from "./Help.module.scss";
import {Link} from "react-router-dom";
import {Clear, Edit} from "@mui/icons-material";

export default function Help() {
    const {status, isLoading, items} = useSelector((state) => state.helpReducer);
    const {isAdmin} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status) {
            dispatch(fetchHelps());
        } else {
            dispatch(fetchInstructs());
        }
    }, [status]);

    const deleteItem = (id) => {
        status ? dispatch(fetchDeleteHelp(id)) : dispatch(fetchDeleteInstruct(id));
    }

    return (<Card sx={{m: "0 auto", mt: 5, mb: 5, width: "100%", pb: 2, pt: 2}}>
            <Typography variant={"h4"} textAlign={"center"}>
                <b>{status ? "Помощь" : "Инструкции"}</b>
            </Typography>
            <CardContent>
                {isLoading ? [...new Array(7)].map((obj, i) => (<Skeleton
                        key={i}
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height={48}
                        sx={{borderRadius: 1, mb: 1}}
                    />)) : items.length === 0 ? (<Typography textAlign={"center"} variant={"h5"}>Здесь
                    пусто</Typography>) : items.map((obj, i) => (
                    <Accordion className={styles.root} variant={"outlined"} key={i} sx={{mb: 1}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{}}>{obj.title}</Typography>
                        </AccordionSummary>
                        {isAdmin ? <div className={styles.editButtons}>
                            <Link to={`/addHelp/${obj._id}/edit`}>
                                <IconButton color="primary">
                                    <Edit/>
                                </IconButton>
                            </Link>
                            <IconButton
                                onClick={() => {
                                    deleteItem(obj._id)
                                }}
                                color="secondary"
                            >
                                <Clear/>
                            </IconButton>
                        </div> : ""}
                        <AccordionDetails>
                            <ReactMarkdown>{obj.description}</ReactMarkdown>
                        </AccordionDetails>
                    </Accordion>))}
            </CardContent>
        </Card>);
}
