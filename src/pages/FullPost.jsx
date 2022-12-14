import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchOnePost } from "../redux/slices/postSlice";
import { addItem } from "../redux/slices/cartSlice";
import { BACK_URL } from "../redux/http";
import ReactMarkdown from 'react-markdown'
import styles from "./FullPost.module.scss";

export default function FullPost() {
  const { id } = useParams();
  const { isLoading, postContent } = useSelector(
    (state) => state.postReducer.postById
  );
  const getCartStatus = useSelector((state) =>
    state.cartReducer.items.find((item) => item._id === postContent._id)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOnePost(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Card sx={{ m: "0 auto", mt: 5, mb: 5, width: "100%", pb: 2 }}>
      {isLoading ? (
        <Skeleton variant="rectangular" animation="wave" height={500} />
      ) : (
        <CardMedia
          component="img"
          height="500px"
          image={`${BACK_URL}${postContent.imageUrl}`}
          alt="green iguana"
        />
      )}
      <CardContent sx={{color: "yellow"}}>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={32}
            sx={{ borderRadius: 1 }}
          />
        ) : (
          <Typography gutterBottom variant="h5" component="div">
            {postContent.title}
          </Typography>
        )}
        {isLoading ? (
          <>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="90%"
              height={17}
              sx={{ mt: 1, borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="73%"
              height={17}
              sx={{ mt: 0.5, borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="55%"
              height={17}
              sx={{ mt: 0.5, borderRadius: 1 }}
            />
          </>
        ) : (
            <ReactMarkdown>{postContent.text}</ReactMarkdown>
        )}
        <Divider />
        <Typography sx={{color: "yellow"}} className={styles.prices} variant="h6" color="text.secondary">
          ?????????????????????????? - {postContent.price1} ???
        </Typography>
        <Divider />
        <Typography sx={{color: "yellow"}} className={styles.prices} variant="h6" color="text.secondary">
          ?? ???????????????????? - {postContent.price2} ???
        </Typography>
        <Divider />
        <Typography sx={{color: "yellow"}} className={styles.prices} variant="h6" color="text.secondary">
          ?????? ?????????????????? - {postContent.price3} ???
        </Typography>
        <Divider />
      </CardContent>
      <CardActions sx={{ ml: 2 }}>
        {isLoading ? (
          <>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={64}
              height={31}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton
              style={{ textDecoration: "none", marginLeft: 2 }}
              variant="rectangular"
              animation="wave"
              width={94}
              height={30}
              sx={{ borderRadius: 2 }}
            />
          </>
        ) : (
          <>
            <Button size="small" variant="contained">
              {postContent.price3} ???
            </Button>
            <Button
              disabled={Boolean(getCartStatus)}
              onClick={() => {
                return dispatch(
                  addItem({
                    _id: postContent._id,
                    title: postContent.title,
                    price: postContent.price,
                  })
                );
              }}
              sx={{ ml: 2 }}
              size="small"
              variant="contained"
              color="secondary"
            >
              {getCartStatus ? "?? ??????????????" : "?? ??????????????"}
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
