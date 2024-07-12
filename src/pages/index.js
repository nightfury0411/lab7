import { Box, Grid } from "@mui/material";
import OrchidCard from "../components/OrchidItem";
import { useEffect, useState } from "react";
import axios from "axios";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function IndexPage() {
  const [listOrchid, setListOrchid] = useState([]);
  const shuffledOrchids = shuffleArray([...listOrchid]);

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const request = await axios.get("/orchid");
        if (request.status === 200 && request.data.length) {
          const response = request.data || [];
          setListOrchid(shuffleArray(response));
        }
      } catch (err) {
        throw err;
      }
    };
    handleFetchData();
  }, []);
  return (
    <>
      <Box
        padding={"3%"}
        style={
          {
            // backgroundColor: "#f0f2fa",
          }
        }
      >
        <Grid
          container
          spacing={6}
          sx={{ padding: 2 }}
          justifyContent="space-between"
        >
          {shuffledOrchids.map((orchid, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <OrchidCard orchid={orchid} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default IndexPage;
