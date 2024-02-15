import { Navigate, Outlet } from "react-router-dom";
import { useGetAdminQuery } from "../store/API/apiSlices/user";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../components/loading/Loading";
export default function ProtectRoute() {
  const MySwal = withReactContent(Swal);
  const { data, isLoading, isSuccess, isError, error } = useGetAdminQuery();

  if (isLoading) {
    return <Loading />;
  } else if (isSuccess && data.role === "admin") {
    return <Outlet />;
  } else if (isSuccess && data.role === "customer") {
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: "un Authorized",
    });
    return <Navigate to="/login" replace />;
  } else if (isError) {
    if (error.originalStatus == 401 || error.status == 401) {
      return <Navigate to="/login" replace />;
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data || error.error,
      });
    }
    console.log(error);
  }
}
