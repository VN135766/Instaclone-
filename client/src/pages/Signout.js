import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signout = ({ setAuthUser }) => {
    Cookies.remove('auth-token')

    setAuthUser(null)

    return <Navigate to="/login" />;
}

export default Signout;