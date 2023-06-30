import { Stack, Card, CardContent, Grid, Typography } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import HtmlIcon from "@mui/icons-material/Html";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FlightIcon from "@mui/icons-material/Flight";
import excel from "./../utils/excel.png";
import BarChartIcon from "@mui/icons-material/BarChart";

function Body() {
  const iconSize = { fontSize: "5em" };
  const cards = [
    {
      icon: <BrushIcon sx={iconSize} />,
      heading: "Design file",
      para: "Create your own design file with our drag and drop builder. No need for any coding or design experience. It’s easy and fun!",
    },
    {
      icon: <HtmlIcon sx={iconSize} />,
      heading: "No-code HTML",
      para: "Convert your design file to a no-code HTML website that looks great on any device. You can customize it as much as you want, and it’s still easy and fun!",
    },
    {
      icon: <PictureAsPdfIcon sx={iconSize} />,
      heading: "PDFs file generation",
      para: "Generate a PDF of your design file with just one click. You can customize the layout and design of your PDF, and it will look great on any device.",
    },
    {
      icon: <FlightIcon sx={iconSize} />,
      heading: "Works offline",
      para: "Canvas works offline which means you can work on your project anytime, anywhere. No need to worry about internet connectivity or server issues.",
    },
    {
      icon: <img src={excel} alt="" height={"100px"} width={"100px"} />,
      heading: "Excel file generation",
      para: "Generate an Excel file from your design file with just one click. You can customize the layout and design of your Excel file, and it will look great on any device.",
    },
    {
      icon: <BarChartIcon sx={iconSize} />,
      heading: "Data visualization",
      para: "Use our data visualization feature to turn your data into beautiful and informative charts and graphs. It’s easy and intuitive, and it will help you make better decisions based on your data.",
    },
  ];

  return (
    <Stack direction="column" p={"8em"} spacing={"4em"}>
      {cards.map((card) => (
        <Card p="2em">
          <CardContent>
            <Grid container>
              <Grid
                item
                xs={6}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {card.icon}
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="h4">{card.heading}</Typography>
                <Typography paragraph>{card.para}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default Body;
