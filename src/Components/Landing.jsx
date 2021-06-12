import { Link } from "react-router-dom"
import {primaryBtn} from "../utils/styles";

export const Landing = () => {
    return(
        <>
        <Link className={primaryBtn} to="/home">Home Page</Link>
        </>
    )
}