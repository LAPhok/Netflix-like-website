function Pagination({ currentPage, totalPages, paginate, episodesPerPage, handleEpisodesPerPageChange }) {
    const disablePrev = currentPage === 1;
    const disableNext = currentPage === totalPages;
    
    return (
        <div>
            <nav className="pagination is-left" role="navigation" aria-label="pagination">
                <a className={`pagination-previous ${disablePrev && "is-disabled"}`}
                    onClick={() => !disablePrev && paginate(currentPage - 1)}>
                    &lt;
                </a>
                <a className={`pagination-next ${disableNext && "is-disabled"}`}
                    onClick={() => !disableNext && paginate(currentPage + 1)}>
                    &gt;
                </a>
                <ul className="pagination-list">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                        <li key={pageNumber}>
                            <a className={`pagination-link ${pageNumber === currentPage && "is-current"}`}
                                onClick={() => paginate(pageNumber)}
                                aria-label={`Page ${pageNumber}`}
                                aria-current={pageNumber === currentPage && "page"}>
                                {pageNumber}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="field has-text-centered">
                <div className="control">
                    <div className="select">
                        <select value={episodesPerPage} onChange={handleEpisodesPerPageChange}>
                            <option value="3">3</option>
                            <option value="6">6</option>
                            <option value="9">9</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pagination;