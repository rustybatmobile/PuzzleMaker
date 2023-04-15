import { useState } from "react";
import { Navigate } from "react-router-dom";


const AuthRedirect = ({children, username}) => {

    if(username) {
        return <Navigate to = "/"/>
    }

    return children
}

export default AuthRedirect;