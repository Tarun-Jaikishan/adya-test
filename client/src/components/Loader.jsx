import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export default function Loader() {
  const loading = useSelector((state) => state.loading.isLoading);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
