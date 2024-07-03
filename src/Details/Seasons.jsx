import { Link } from "react-router-dom";

function Seasons({ tvShowDetails }) {
    return (
        <div className="section">
            <h2 className="title">Seasons</h2>
            <div className="columns is-multiline">
                {tvShowDetails.seasons && tvShowDetails.seasons.map(season => (
                    <div key={season.seasonId} className="column is-one-quarter">
                        <Link to={`/episodes/${season.seasonId}`} className="season">
                            <img src={season.imgURL} alt={`Season ${season.number}`} style={{ width: "100%", marginBottom: "10px" }} />
                            <p className="is-size-5 has-text-centered">Season {season.number}</p>
                            <p className="is-size-5 has-text-centered">Episodes: {season.episodeCount}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Seasons;
