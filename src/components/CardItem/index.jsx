import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IconButton, Skeleton} from "@mui/material";
import {Link} from "react-router-dom";
import styles from "./MediaCard.module.scss";
import {Edit, Clear} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {fetchRemovePost} from "../../redux/slices/postSlice";
import {addItem} from "../../redux/slices/cartSlice";
import {BACK_URL} from "../../redux/http";

export default function CardItem({ isLoading, _id = 0, title, price, imageUrl}) {
    const { isAdmin } = useSelector(state => state.userReducer);
    const getCartStatus = useSelector(state => state.cartReducer.items.find((item) => item._id === _id));
    const dispatch = useDispatch();

    return (
        <Card className={styles.root} sx={{ maxWidth: 345, mt: 1 }}>
            { isAdmin
                ?
                <div className={styles.editButtons}>
                    <Link to={`/post/${_id}/edit`}>
                        <IconButton color="primary">
                            <Edit />
                        </IconButton>
                    </Link>
                    <IconButton onClick={() => {dispatch((fetchRemovePost(_id)))}} color="secondary">
                        <Clear />
                    </IconButton>
                </div>
                :
                 ''
            }
            {isLoading
                ? <Skeleton variant="rectangular" animation="wave" height={190} />
                : <CardMedia
                    component="img"
                    height="190"
                    image={`${BACK_URL}${imageUrl}`}
                    alt="green iguana"
                />
            }
            <CardContent sx={{height: 18}}>
                {isLoading
                    ? <Skeleton variant="rectangular" animation="wave" width="100%" height={32} sx={{borderRadius: 1}} />
                    : <Typography sx={{width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}} gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                }
            </CardContent>
            <CardActions>
                {isLoading
                    ? <>
                        <Skeleton style={{ textDecoration: 'none', marginLeft: 8 }} variant="rectangular" animation="wave" width={64} height={30} sx={{borderRadius: 2}}/>
                        <Skeleton style={{ textDecoration: 'none', marginLeft: 2 }} variant="rectangular" animation="wave" width={94} height={30} sx={{borderRadius: 2}}/>
                    </>
                    : <>
                        <Link style={{ textDecoration: 'none', marginLeft: 8 }} to={`/post/${_id}`}>
                            <Button size="small" variant="contained" >
                                {`${price} ₸`}
                            </Button>
                        </Link>
                        <Button disabled={Boolean(getCartStatus)} onClick={() => {return dispatch(addItem({_id, title, price}))}} sx={{ml: 2}} size="small" variant="contained" color="secondary">
                            {getCartStatus ? "В КОРЗИНЕ" : "В КОРЗИНУ"}
                        </Button>
                    </>
                }
            </CardActions>
        </Card>
    );
}
