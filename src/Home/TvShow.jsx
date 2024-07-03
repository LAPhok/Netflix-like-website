import { Link } from "react-router-dom";

function TvShow({ show }) {
    return (
        <div className="column is-12-mobile is-6-tablet is-3-desktop">
            <Link to={`/details/${show.tvshowId}`} className="card has-text-black tv-show-card">
                <div className="card-image">
                    <figure className="image">
                        <img src={show.imgURL} alt={show.title} />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">
                        <h3 className="title is-4 has-text-centered has-text-black">{show.title}</h3>
                        <div className="mb-2">
                            <span className="has-text-weight-bold">Studio : </span>
                            <span>{show.studio.name}</span>
                        </div>
                        <div className="mb-2">
                            <span className="has-text-weight-bold">Genres : </span>
                            <span>{show.genres.map((g) => g.name).join(", ")}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default TvShow;
