function Info({ tvShowDetails }) {
    return (
        <div className="columns is-multiline">
            <div className="column is-one-quarter">
                <img src={tvShowDetails.imgURL} alt={tvShowDetails.title} />
            </div>
            <div className="column">
                <h1 className="title">{tvShowDetails.title}</h1>
                <p>Rating: {tvShowDetails.rating}</p>
                <p>{tvShowDetails.year}</p>
                <p>{tvShowDetails.episodeCount} episodes</p>
                <p>Genres: {tvShowDetails.genres.map(genre => genre.name).join(", ")}</p>
                <p>Studio: {tvShowDetails.studio.name}</p>
                <p>TV Parental Guideline: {tvShowDetails.tvParentalGuideline}</p>
                <p style={{ textAlign: "justify" }}>Description: {tvShowDetails.plot}</p>
                <audio controls autoPlay src={tvShowDetails.audioURL}>
                    <source src={tvShowDetails.audioURL} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );
}

export default Info;
