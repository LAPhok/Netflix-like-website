import { Link } from "react-router-dom";

function Episodes({ episode, isWatched }) {
    return (
        <div className="column is-12-mobile is-6-tablet is-3-desktop">
            <div className="card">
                <Link to={`/watchepisode/${episode.episodeId}`}>
                    <div className="card-image" style={{ filter: isWatched ? "grayscale(100%) blur(0.9px)" : "none" }}>
                        <figure className="image is-16by9">
                            <img src={episode.imgURL} alt={`Episode ${episode.title}`} />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <h3 className="title is-5">{episode.title}</h3>
                            <p>{episode.number}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Episodes;
