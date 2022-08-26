import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Remove, ShoppingCart } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../../redux/slices/cartSlice";

export default function Cart() {
  const { items } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const a =
    items.length === 0
      ? 0
      : items.reduce((prev, cur) => {
          if (prev.price) {
            return prev.price + cur.price;
          } else {
            return prev + cur.price;
          }
        });

  return (
    <Accordion style={{ overflow: "hidden" }} sx={{ width: "100%", color: "yellow" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <ShoppingCart sx={{ mr: 4.5 }} />
        <Typography>Корзина</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {items.length !== 0 ? (
          items.map((obj) => (
            <List key={obj._id}>
              <Divider />
              <ListItem disablePadding sx={{ mt: 3 }}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                  }}
                  to={`/post/${obj._id}`}
                >
                  <Typography
                    sx={{
                        color: "yellow",
                      width: "120px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {obj.title}
                  </Typography>
                  <Typography
                    sx={{
                        color: "yellow",
                      overflow: "hidden",
                      width: "69px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    - {obj.price} ₸
                  </Typography>
                </Link>
                <Button
                  onClick={() => dispatch(removeItem(obj._id))}
                  sx={{ pr: 3.5 }}
                >
                  <Remove />
                </Button>
              </ListItem>
            </List>
          ))
        ) : (
          <List>
            <Divider />
            <ListItem disablePadding sx={{ mt: 3 }}>
              <Typography
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                Корзина пуста
              </Typography>
            </ListItem>
          </List>
        )}
        {items.length !== 0 ? (
          <List>
            <Divider />
            <ListItem disablePadding sx={{ mt: 3, mb: 3 }}>
              <Typography
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                Общая сумма {items.length === 1 ? a.price : a}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem disablePadding sx={{ mt: 3 }}>
              <Button onClick={() => dispatch(clearCart())} sx={{ ml: 2 }}>
                <Typography
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  Очистить корзину
                </Typography>
              </Button>
            </ListItem>
          </List>
        ) : (
          ""
        )}
      </AccordionDetails>
    </Accordion>
  );
}
