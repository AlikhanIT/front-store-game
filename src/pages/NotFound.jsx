import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function NotFound() {
  return (
    <Card sx={{ m: "0 auto", mt: 5, mb: 5, width: "100%", pb: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Ошибка 404, данной страницы не существует
        </Typography>
      </CardContent>
    </Card>
  );
}
