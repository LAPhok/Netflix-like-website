import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { svrURL } from "../components/constants.js";
import Info from "./Info";
import Roles from "./Roles";
import Seasons from "./Seasons";
import FavoriteButtons from "./FavoriteButtons";
import { useAuth } from "../User/Auth.jsx";

function Details() {
    const { tvshowId } = useParams();
    const [tvShowDetails, setTvShowDetails] = useState(null);
    const { authToken } = useAuth();

    useEffect(() => {
        fetchTvShowDetails();
    }, [tvshowId]);

    async function fetchTvShowDetails() {
        try {
            const response = await fetch(`${svrURL}/tvshow?tvshowId=${tvshowId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch TV show details");
            }
            const data = await response.json();
            setTvShowDetails(data);
        } catch (error) {
            console.error("Error fetching TV show details:", error);
        }
    }

    return (
        <div className="container">
            {tvShowDetails && (
                <>
                    {authToken && <FavoriteButtons tvshowId={tvshowId} />}
                    <Info tvShowDetails={tvShowDetails} />
                    <Roles tvShowDetails={tvShowDetails} />
                    <Seasons tvShowDetails={tvShowDetails} />
                </>
            )}
        </div>
    );
}

export default Details;
