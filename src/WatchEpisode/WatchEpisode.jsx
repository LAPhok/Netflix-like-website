import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { svrURL } from "../components/constants.js";
import { useAuth } from "../User/Auth.jsx";
import InfoEpisode from "./InfoEpisode.jsx";
import Episode from "./Episode.jsx";

function WatchEpisode() {
    const { authToken, isAuthenticated } = useAuth();
    const { episodeId } = useParams();
    const [episodeInfo, setEpisodeInfo] = useState(null);
    const [videoURL, setVideoURL] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEpisodeInfo() {
            try {
                const response = await fetch(`${svrURL}/episode?episodeId=${episodeId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch episode information");
                }
                const data = await response.json();
                setEpisodeInfo(data);
            } catch (error) {
                console.error("Error fetching episode information:", error);
                setErrorMessage("Failed to fetch episode information. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        async function fetchVideoURL() {
            if (!authToken) {
                console.log("No auth token");
                return;
            }
            try {
                const response = await fetch(`${svrURL}/viewepisode?episodeId=${episodeId}`, {
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch video URL");
                }
                const data = await response.json();
                setVideoURL(data.videoURL);
            } catch (error) {
                console.error("Error fetching video URL:", error);
                setErrorMessage("Failed to fetch video URL. Please try again later.");
            }
        }

        fetchEpisodeInfo();
        if (isAuthenticated) {
            fetchVideoURL();
        }
    }, [authToken, episodeId, isAuthenticated]);

    function handleLoginRedirect() {
        window.location.href = "/login";
    }

    return (
        <div className="container">
            {loading && <p>Loading...</p>}
            {!isAuthenticated && episodeInfo && (
                <div>
                    <InfoEpisode episode={episodeInfo} />
                    <p>You need to log in to watch the video.</p>
                    <button className="button is-primary" onClick={handleLoginRedirect}>Log In</button>
                </div>
            )}
            {isAuthenticated && errorMessage && (
                <div className="notification is-danger">{errorMessage}</div>
            )}
            {isAuthenticated && episodeInfo && (
                <div>
                    <InfoEpisode episode={episodeInfo} />
                    <Episode videoURL={videoURL} />
                </div>
            )}
        </div>
    );
}

export default WatchEpisode;
