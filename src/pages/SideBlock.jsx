import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const SideBlock = ({ title, children }) => {
    return (
        <Paper sx={{mb: "20px", mt: 5, backgroundColor: "black", color: "yellow"}}>
            <Typography textAlign={"center"} variant="h6" sx={{p: "15px 15px 0 15px"}}>
                {title}
            </Typography>
            {children}
        </Paper>
    );
};
