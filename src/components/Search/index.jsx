import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostTitles } from "../../redux/slices/postSlice";

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const { titles, isLoading } = useSelector((state) => state.postReducer.title);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPostTitles());
  }, []);

  return (
    <Autocomplete
      id="asynchronous-demo"
      spacing={2}
      sx={{ m: "0 auto", mt: 2, mb: 3, width: "90%", pr: "15px" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={titles}
      loadingText="ИДЁТ ЗАГРУЗКА ПОДОЖДИТЕ..."
      noOptionsText="По вашему запросу ничего не найдено"
      loading={isLoading}
      renderOption={(props, titles) => (
        <Link
          style={{ textDecoration: "none" }}
          to={`/post/${titles._id}`}
          {...props}
          component="li"
          key={titles._id}
        >
          <Box sx={{ color: "yellow" }}>{titles.title}</Box>
        </Link>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          type={"search"}
          color={"primary"}
          sx={{backgroundColor: "black", borderRadius: "7px"}}
          label="Поиск"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
