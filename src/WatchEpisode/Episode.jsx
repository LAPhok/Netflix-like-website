function Episode({ videoURL }) {
    if (!videoURL) {
        return <div>No video available</div>;
    }

    return (
        <div className="columns is-centered">
            <div className="column is-10">
                <div className="card">
                    <div className="card-content">
                        <div className="content">
                            <video className="video" controls style={{ width: "100%", display: "block", margin: "0 auto" }}>
                                <source src={videoURL} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Episode;
