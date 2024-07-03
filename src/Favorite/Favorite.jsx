import { useState, useEffect } from "react";
import { svrURL } from "../components/constants.js";
import FavoriteShow from "./FavoriteShow.jsx";
import { useAuth } from "../User/Auth.jsx";
import Pagination from "./Pagination.jsx";

function Favorite() {
    const { authToken } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showsPerPage, setShowsPerPage] = useState(4);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const response = await fetch(`${svrURL}/favorites`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch favorites");
                }
                const data = await response.json();
                setFavorites(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        }

        if (authToken) {
            fetchFavorites();
        }
    }, [authToken]);

    // Pagination
    function handlePaginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function handleShowsPerPageChange(e) {
        setShowsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    }

    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = favorites.slice(indexOfFirstShow, indexOfLastShow);
    const totalPages = Math.ceil(favorites.length / showsPerPage);

    return (
        <div className="container">
            <h2 className="title has-text-centered mt-4 mb-5">Favorite Shows</h2>
            {loading ? (
                <div className="has-text-centered">Loading...</div>
            ) : favorites.length === 0 ? (
                <div className="has-text-centered">No favorite shows yet.</div>
            ) : (
                <div className="columns is-multiline">
                    {currentShows.map((show) => (
                        <FavoriteShow key={show.tvshowId} show={show} />
                    ))}
                </div>
            )}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={handlePaginate}
                    showsPerPage={showsPerPage}
                    handleShowsPerPageChange={handleShowsPerPageChange}
                />
            )}
        </div>
    );
}

export default Favorite;
