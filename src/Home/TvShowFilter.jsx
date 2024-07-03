function TvShowFilter({ filterTitle, filterStudio, setFilterTitle, setFilterStudio, studios }) {
    return (
        <div className="field is-horizontal">
            <div className="field-body">
                <div className="field">
                    <div className="control">
                        <input 
                            id="title" 
                            className="input" 
                            type="text" 
                            placeholder="Rechercher par titre"
                            value={filterTitle}
                            onChange={e => setFilterTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select 
                                id="studios"
                                value={filterStudio}
                                onChange={e => setFilterStudio(e.target.value)}
                            >
                                <option value="">Tous les Studios</option>
                                {studios.map(studio => (
                                    <option key={studio.studioId} value={studio.name}>{studio.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TvShowFilter;
