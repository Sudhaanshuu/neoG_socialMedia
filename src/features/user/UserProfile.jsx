import { useParams } from "react-router"

export const UserProfile = () => {
    const {username} = useParams();
    return(
        <h1>{username}</h1>
    )
}