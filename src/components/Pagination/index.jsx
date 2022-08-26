import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/slices/postSlice";

export default function PaginationControlled() {
  const { pageCount, page } = useSelector((state) => {
    return state.postReducer;
  });
  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };

  return (
    <Stack spacing={2} sx={{ m: "0 auto", mt: 4, mb: 3, width: "auto" }}>
      <Pagination
        count={pageCount}
        color={"secondary"}
        size="large"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
