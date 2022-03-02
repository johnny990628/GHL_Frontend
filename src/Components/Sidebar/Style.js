import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "var(--sidebar-width)",
    borderRadius: "0 2rem 2rem 0 ",
    // boxShadow: "6px 6px 10px rgba(0,0,0,0.2)",
  },
  list: {
    height: "100%",
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
    margin: theme.spacing(1),
    borderRadius: "1rem",
    transition: "transform .3s ease-out",
    "&.active": {
      backgroundColor: theme.palette.primary.light,
    },
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
  text: {
    color: "#000000",
    fontSize: "1.3rem",
    marginLeft: "1rem",
    "&.active": {
      color: theme.palette.primary.main,
    },
  },
  logo: {
    margin: "1rem",
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
