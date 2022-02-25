import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    position: "absolute",
    left: "var(--sidebar-width)",
  },
}));

export default useStyles;
