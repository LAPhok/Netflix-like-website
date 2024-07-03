import { useState, useEffect } from "react";
import { svrURL } from "../components/constants.js";
import HistoryEpisodes from "./HistoryEpisodes";
import { useAuth } from "../User/Auth.jsx";
import Pagination from "./Pagination";

function History() {
    const { authToken } = useAuth();
    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [watchedEpisodes, setWatchedEpisodes] = useState([]);
    const [episodesPerPage, setEpisodesPerPage] = useState(6);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const response = await fetch(`${svrURL}/user/history`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch history");
                }
                const data = await response.json();
                setHistory(data);
                // Assuming the API returns watchedEpisodes within data
                setWatchedEpisodes(data.watchedEpisodes || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        }

        if (authToken) {
            fetchHistory();
        }
    }, [authToken]);

    // Pagination
    const indexOfLastEpisode = currentPage * episodesPerPage;
    const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
    const currentEpisodes = history.slice(indexOfFirstEpisode, indexOfFirstEpisode + episodesPerPage);
    const totalPages = Math.ceil(history.length / episodesPerPage);

    function handlePaginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function handleEpisodesPerPageChange(e) {
        setEpisodesPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div className="container">
            <h2 className="title has-text-centered mt-4 mb-5">History</h2>
            {loading ? (
                <div className="has-text-centered">Loading...</div>
            ) : history.length === 0 ? (
                <div className="has-text-centered">No watched episodes yet.</div>
            ) : (
                <div className="columns is-multiline">
                    {currentEpisodes.map((episode) => {
                        const isWatched = watchedEpisodes.some((watchedEpisode) => watchedEpisode.episodeId === episode.episodeId);
                        return <HistoryEpisodes key={episode.episodeId} episode={episode} isWatched={isWatched} />;
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

export default History;
