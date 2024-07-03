import { useState, useEffect } from "react";
import { svrURL } from "../components/constants";
import TvShow from "./TvShow";
import TvShowFilter from "./TvShowFilter";
import Pagination from "./Pagination";

function Home() {
    const [tvShows, setTvShows] = useState([]);
    const [studios, setStudios] = useState([]);
    const [filterTitle, setFilterTitle] = useState("");
    const [filterStudio, setFilterStudio] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showsPerPage, setShowsPerPage] = useState(4);

    useEffect(() => {
        async function fetchTvShows() {
            try {
                const response = await fetch(`${svrURL}/tvshows`);
                if (!response.ok) {
                    throw new Error("Failed to fetch TV shows");
                }
                const data = await response.json();
                setTvShows(data);
            } catch (error) {
                console.error("Error fetching TV shows:", error);
            }
        }

        async function fetchStudios() {
            try {
                const response = await fetch(`${svrURL}/studios`);
                if (!response.ok) {
                    throw new Error("Failed to fetch studios");
                }
                const data = await response.json();
                setStudios(data);
            } catch (error) {
                console.error("Error fetching studios:", error);
            }
        }

        fetchTvShows();
        fetchStudios();
    }, []);

    function filterShows(tvShows, filterTitle, filterStudio) {
        return tvShows.filter((show) => {
            const titleMatch = show.title.toLowerCase().includes(filterTitle.toLowerCase());
            const studioMatch = filterStudio === "" || show.studio.name.toLowerCase() === filterStudio.toLowerCase();
            return titleMatch && studioMatch;
        });
    }

    function handlePaginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function handleShowsPerPageChange(e) {
        setShowsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterTitleChange(title) {
        setFilterTitle(title);
        setCurrentPage(1);
    }

    function handleFilterStudioChange(studio) {
        setFilterStudio(studio);
        setCurrentPage(1);
    }

    const filteredShows = filterShows(tvShows, filterTitle, filterStudio);
    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = filteredShows.slice(indexOfFirstShow, indexOfLastShow);
    const totalPages = Math.ceil(filteredShows.length / showsPerPage);

    return (
        <div className="container">
            <TvShowFilter
                filterTitle={filterTitle}
                filterStudio={filterStudio}
                setFilterTitle={handleFilterTitleChange}
                setFilterStudio={handleFilterStudioChange}
                studios={studios}
            />

            <div className="columns is-multiline">
                {currentShows.map(show => (
                    <TvShow key={show.tvshowId} show={show} />
                ))}
            </div>

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

export default Home;
