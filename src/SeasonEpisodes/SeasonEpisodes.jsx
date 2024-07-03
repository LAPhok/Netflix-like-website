import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { svrURL } from "../components/constants.js";
import Episodes from "./Episodes.jsx";
import Pagination from "./Pagination";
import { useAuth } from "../User/Auth.jsx";

function SeasonEpisodes() {
    const { seasonId } = useParams();
    const { authToken } = useAuth();
    const [seasonInfo, setSeasonInfo] = useState(null);
    const [episodes, setEpisodes] = useState(null);
    const [watchedEpisodes, setWatchedEpisodes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [episodesPerPage, setEpisodesPerPage] = useState(8);

    useEffect(() => {
        fetchSeasonInfo();
        fetchEpisodes();
        if (authToken) {
            fetchWatchedEpisodes();
        }
    }, [seasonId, authToken]);

    async function fetchSeasonInfo() {
        try {
            const response = await fetch(`${svrURL}/episodes?seasonId=${seasonId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch season info");
            }
            const data = await response.json();
            setSeasonInfo(data);
        } catch (error) {
            console.error("Error fetching season info:", error);
        }
    }

    async function fetchEpisodes() {
        try {
            const response = await fetch(`${svrURL}/episodes?seasonId=${seasonId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch episodes");
            }
            const data = await response.json();
            setEpisodes(data.episodes);
        } catch (error) {
            console.error("Error fetching episodes:", error);
        }
    }

    async function fetchWatchedEpisodes() {
        try {
            const response = await fetch(`${svrURL}/user/history`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.status === 401) {
                throw new Error("Unauthorized: Invalid or expired token");
            }
            if (!response.ok) {
                throw new Error("Failed to fetch watched episodes");
            }
            const data = await response.json();
            setWatchedEpisodes(data);
        } catch (error) {
            console.error("Error fetching watched episodes:", error);
        }
    }

    // Pagination
    const indexOfLastEpisode = currentPage * episodesPerPage;
    const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
    const currentEpisodes = episodes && episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);
    const totalPages = Math.ceil(episodes ? episodes.length / episodesPerPage : 0);

    
    function handlePaginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function handleEpisodesPerPageChange(e) {
        setEpisodesPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div className="container">
            {seasonInfo && (
                <div className="section has-text-centered">
                    <h2 className="title">{seasonInfo.tvshowTitle}</h2>
                    <h3 className="subtitle">{seasonInfo.seasonNumber}</h3>
                </div>
            )}
            {currentEpisodes && (
                <div className="columns is-multiline">
                    {currentEpisodes.map((episode) => {
                        const isWatched = watchedEpisodes.some((watchedEpisode) => watchedEpisode.episodeId === episode.episodeId);
                        return <Episodes key={episode.episodeId} episode={episode} isWatched={isWatched} />;
                    })}
                </div>
            )}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={handlePaginate}
                    episodesPerPage={episodesPerPage}
                    handleEpisodesPerPageChange={handleEpisodesPerPageChange}
                />
            )}
        </div>
    );
}

export default SeasonEpisodes;
