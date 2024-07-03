function Roles({ tvShowDetails }) {
    return (
        <div className="section">
            <h2 className="title">Roles</h2>
            <div className="scrolling-wrapper" style={{ overflowX: "auto", overflowY: "hidden" }}>
                <div className="columns" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    {tvShowDetails.roles && tvShowDetails.roles.map(role => (
                        <div key={role.roleId} className="column is-one-quarter" style={{ minWidth: "200px" }}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-3by4">
                                        <img src={role.imgURL} alt={role.name} />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <p className="title is-6 has-text-centered">{role.character}</p>
                                    <p className="subtitle is-7 has-text-centered">{role.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Roles;
