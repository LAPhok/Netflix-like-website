import { Link } from "react-router-dom";

function HistoryEpisodes({ episode }) {
    return (
        <div className="column is-12-mobile is-6-tablet is-4-desktop">
            <div className="card">
                <Link to={`/watchepisode/${episode.episodeId}`}>
                    <div className="card-image">
                        <figure className="image is-16by9">
                            <img
                                src={episode.imgURL}
                                alt={`Episode ${episode.title}`}
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="content has-text-centered">
                            <h3 className="title is-5">{episode.tvshowTitle}</h3>
                            <p className="subtitle is-6">Season {episode.seasonNumber}</p>
                            <p className="is-size-6">{episode.episodeTitle}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default HistoryEpisodes;