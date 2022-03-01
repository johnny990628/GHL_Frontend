import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.primary.secondary,
    height: "100%",
    borderRadius: "2rem",
    marginRight: theme.spacing(2),
    boxShadow: "6px 6px 10px rgba(0,0,0,0.2)",
  },
}));

export default useStyles;
