import localFont from "next/font/local";

const Roboto = localFont({
  src: [
    {
      path: "./Roboto-Black.ttf",
      weight: "900", // Roboto Black
      style: "normal",
    },
    {
      path: "./Roboto-BlackItalic.ttf",
      weight: "900", // Roboto Black Italic
      style: "italic",
    },
    {
      path: "./Roboto-Bold.ttf",
      weight: "700", // Roboto Bold
      style: "normal",
    },
    {
      path: "./Roboto-BoldItalic.ttf",
      weight: "700", // Roboto Bold Italic
      style: "italic",
    },
    {
      path: "./Roboto-Italic.ttf",
      weight: "400", // Roboto Regular Italic
      style: "italic",
    },
    {
      path: "./Roboto-Light.ttf",
      weight: "300", // Roboto Light
      style: "normal",
    },
    {
      path: "./Roboto-LightItalic.ttf",
      weight: "300", // Roboto Light Italic
      style: "italic",
    },
    {
      path: "./Roboto-Medium.ttf",
      weight: "500", // Roboto Medium
      style: "normal",
    },
    {
      path: "./Roboto-MediumItalic.ttf",
      weight: "500", // Roboto Medium Italic
      style: "italic",
    },
    {
      path: "./Roboto-Regular.ttf",
      weight: "400", // Roboto Regular
      style: "normal",
    },
    {
      path: "./Roboto-Thin.ttf",
      weight: "100", // Roboto Thin
      style: "normal",
    },
    {
      path: "./Roboto-ThinItalic.ttf",
      weight: "100", // Roboto Thin Italic
      style: "italic",
    },
  ],
  display: "swap",
});

export default Roboto;
