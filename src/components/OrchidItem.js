import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrchidCard = ({ orchid }) => {
  const navigate = useNavigate();
  if (!orchid) return null;
  return (
    <Box
      sx={{
        maxWidth: "400px",
        backgroundColor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
      }}
    >
      <img
        alt="product"
        style={{ width: "100%", height: "300px" }}
        src={orchid.image}
      />
      <Box p={"20px"}>
        <Typography sx={{ color: "#663b2d", fontSize: "28px" }}>
          {orchid?.name}
        </Typography>
        <Rating readOnly value={orchid?.rating} />
        <Typography
          sx={{ color: "#663b2d", fontStyle: "italic", fontSize: "14px" }}
        >
          Orchids are easily distinguished from other plants, as they share some
          very evident derived characteristics or synapomorphies
        </Typography>
        <Button
          sx={{
            "&:hover": {
              backgroundColor: "#663b2d",
              color: "#fff!important",
            },
          }}
          style={{
            border: "1px solid #663b2d",
            borderRadius: "20px",
            color: "#663b2d",
            minWidth: "120px",
            fontSize: "12px",
            fontWeight: "bold",
            marginTop: "20px",
          }}
          onClick={() => navigate(`/detail/${orchid?.id}`)}
        >
          Detail
        </Button>
      </Box>
    </Box>
  );
};

export default OrchidCard;
