import { Button, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrchidDetailPage = () => {
  const theme = useTheme();
  const [orchid, setOrchid] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const request = await axios.get(`/orchid?id=${id}`);
        if (request.status === 200 && request.data.length) {
          const response = request.data[0] || {};
          setOrchid(response);
        }
      } catch (err) {
        throw err;
      }
    };
    if (id) handleFetchData();
  }, [id]);

  const handleAddToCart = () => {
    alert(`Check your cart`);
  };

  if (!id) return null;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
          gap: "2rem",
          padding: "2rem",
          backgroundColor: "background.paper",
        }}
      >
        <img
          src={orchid?.image}
          alt={orchid?.name}
          style={{
            maxWidth: "600px",
            height: "750px",
            width: "100%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            {orchid?.name}
          </Typography>
          <Rating
            name="read-only"
            value={orchid.rate ? 5 : 0}
            readOnly
            style={{ marginBottom: "20px" }}
          />
          <Typography
            variant="h5"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            Color:{" "}
            <Box
              sx={{
                bgcolor: orchid.color,
                height: "40px",
                width: "40px",
                ml: "10px",
              }}
            ></Box>
          </Typography>
          <Typography variant="h5" gutterBottom>
            Origin: <span style={{ color: "blue" }}>{orchid?.origin}</span>
          </Typography>
          <Typography variant="h5" gutterBottom>
            Category: <span style={{ color: "red" }}>{orchid?.category}</span>
          </Typography>
          <Typography>
            Terrestrial orchids may be rhizomatous or form corms or tubers. The
            root caps of terrestrial orchids are smooth and white. Some
            sympodial terrestrial orchids, such as Orchis and Ophrys, have two
            subterranean tuberous roots. One is used as a food reserve for
            wintry periods, and provides for the development of the other one,
            from which visible growth develops. In warm and constantly humid
            climates, many terrestrial orchids do not need pseudobulbs.
            Epiphytic orchids, those that grow upon a support, have modified
            aerial roots that can sometimes be a few meters long. In the older
            parts of the roots, a modified spongy epidermis, called a velamen,
            has the function of absorbing humidity. It is made of dead cells and
            can have a silvery-grey, white or brown appearance. In some orchids,
            the velamen includes spongy and fibrous bodies near the passage
            cells, called tilosomes. The cells of the root epidermis grow at a
            right angle to the axis of the root to allow them to get a firm
            grasp on their support. Nutrients for epiphytic orchids mainly come
            from mineral dust, organic detritus, animal droppings and other
            substances collecting among on their supporting surfaces. Pseudobulb
            of Prosthechea fragrans The base of the stem of sympodial epiphytes,
            or in some species essentially the entire stem, may be thickened to
            form a pseudobulb that contains nutrients and water for drier
            periods. The pseudobulb typically has a smooth surface with
            lengthwise grooves, and can have different shapes, often conical or
            oblong. Its size is very variable; in some small species of
            Bulbophyllum, it is no longer than two millimeters, while in the
            largest orchid in the world, Grammatophyllum speciosum (giant
            orchid), it can reach three meters. Some Dendrobium species have
            long, canelike pseudobulbs with short, rounded leaves over the whole
            length; some other orchids have hidden or extremely small
            pseudobulbs, completely included inside the leaves. With ageing the
            pseudobulb sheds its leaves and becomes dormant. At this stage it is
            often called a backbulb. Backbulbs still hold nutrition for the
            plant, but then a pseudobulb usually takes over, exploiting the last
            reserves accumulated in the backbulb, which eventually dies off,
            too. A pseudobulb typically lives for about five years. Orchids
            without noticeable pseudobulbs are also said to have growths, an
            individual component of a sympodial plant.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            sx={{ mt: "20px", bgcolor: "#663b2d", p: "10px", width: "160px" }}
          >
            BUY NOW
          </Button>
          <Button
            type="button"
            onClick={() => {
              throw new Error("Sentry Test Error");
            }}
          >
            Break the world
          </Button>
          ;
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          p: 2,
          borderTop: "1px solid",
        }}
      >
        <Typography variant="body1" align="center">
          &copy; ORCHID DETAIL PAGE AND MUI
        </Typography>
      </Box>
    </>
  );
};

export default OrchidDetailPage;
