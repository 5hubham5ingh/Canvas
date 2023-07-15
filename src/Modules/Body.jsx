import { Stack, Card, CardContent, Grid, Typography } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import HtmlIcon from "@mui/icons-material/Html";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FlightIcon from "@mui/icons-material/Flight";
import excel from "./../utils/excel.png";
import BarChartIcon from "@mui/icons-material/BarChart";
import "./Styles/body.css";
function Body() {
  const iconSize = { fontSize: "20vw", color: "white" };
  const cards = [
    {
      icon: <BrushIcon sx={iconSize} />,
      heading: "Design file",
      para: "Create your own design file with the drag and drop designer. No need for any coding or design experience. It’s easy and fun!",
    },
    {
      icon: <HtmlIcon sx={iconSize} />,
      heading: "No-code HTML",
      para: "Convert your design file to a HTML webpage that looks great on any device. You can customize it as much as you want, and it’s still easy and fun!",
    },
    {
      icon: <PictureAsPdfIcon sx={iconSize} />,
      heading: "PDFs file generation",
      para: "Generate a PDF of your design file with just one click. You can customize the layout and design of your PDF, and it will look great on any device.",
    },

    {
      icon: <img src={excel} alt="" width={"200vw"} />,
      heading: "Excel file generation",
      para: "Generate an Excel file from your design file with just one click. You can customize the layout and design of your Excel file, and it will look great on any device.",
    },
    {
      icon: <BarChartIcon sx={iconSize} />,
      heading: "Data visualization",
      para: "Use the data visualization feature to turn your data into beautiful and informative charts and graphs. It’s easy and intuitive, and it will help you make better decisions based on your data.",
    },
    {
      icon: <FlightIcon sx={iconSize} />,
      heading: "Works offline",
      para: "Canvas works offline which means you can work on your project anytime, anywhere. No need to worry about internet connectivity or server issues.",
    },
  ];

  return (
    <Stack
      className="scroll-container"
      direction="column"
      p={"6em"}
      spacing={"4em"}
      alignItems={"center"}
    >
      {cards.map((card, index) => (
        <Card
          p="2em"
          className="Card"
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100vw",
            minHeight: "80vh",
            color: "white",
            background: "black",
            opacity: "80%",
            borderRadius: "1em",
          }}
        >
          <CardContent>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {card.icon}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h2">{card.heading}</Typography>
                <Typography variant="h5" p={"1em"} pl={0}>
                  {card.para}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default Body;
