import { useState, useEffect } from "react";
import { svrURL } from "../components/constants.js";
import { useAuth } from "../User/Auth.jsx";

function FavoriteButtons({ tvshowId }) {
    const { authToken } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetchFavoriteStatus();
    }, [tvshowId]);

    async function fetchFavoriteStatus() {
        try {
            const response = await fetch(`${svrURL}/favorite?tvshowId=${tvshowId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setIsFavorite(data.isFavorite);
            }
        } catch (error) {
            console.error("Error fetching favorite status:", error);
        }
    }

    async function addFavorite() {
        try {
            const response = await fetch(`${svrURL}/favorite?tvshowId=${tvshowId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ tvshowId }),
            });

            if (response.ok) {
                setIsFavorite(true);
            }
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
    }

    async function removeFavorite() {
        try {
            const response = await fetch(`${svrURL}/favorite?tvshowId=${tvshowId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                setIsFavorite(false);
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    }

    return (
        <div className="section has-text-centered">
            {authToken && (
                <div>
                    {isFavorite && (
                        <button className="button is-danger" onClick={removeFavorite}>
                            Remove from Favorites
                        </button>
                    )}
                    {!isFavorite && (
                        <button className="button is-primary" onClick={addFavorite}>
                            Add to Favorites
                        </button>
                    )}
                </div>
            )}
        </div>
    );
    
}

export default FavoriteButtons;
