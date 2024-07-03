function InfoEpisode({ episode }) {
    return (
        <section className="section">
            <div className="container">
                <h2 className="title is-3">{episode.title}</h2>
                <div className="columns is-multiline">
                    <div className="column is-full">
                        <strong>Episode Number:</strong> {episode.number}
                    </div>
                    <div className="column is-full">
                        <strong>Aired:</strong> {episode.aired}
                    </div>
                    <div className="column is-full">
                        <strong>Runtime:</strong> {episode.runtime} minutes
                    </div>
                    <div className="column is-full">
                        <strong>Plot:</strong> 
                        <p className="is-justify">{episode.plot}</p> {/* Applying justify class */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InfoEpisode;
