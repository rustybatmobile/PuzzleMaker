import { Navigate } from "react-router-dom";

const RequireAuth = ({username, children}) => {

    if(!username) {
        return <Navigate to = "/"/>
    }

    return <>{children}</>
}

export default RequireAuth;