import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NavBar } from "./components/NavBar.jsx";
import { NoMatch } from "./components/NoMatch.jsx";
import { AuthProvider } from "./User/Auth.jsx";
import { Login } from "./User/Login.jsx";
import { SignUp } from "./User/SignUp.jsx";
import { Profile } from "./User/Profile.jsx";

import Home from "./Home/Home.jsx";
import Details from "./Details/Details.jsx";
import SeasonEpisodes from "./SeasonEpisodes/SeasonEpisodes.jsx";
import WatchEpisode from "./WatchEpisode/WatchEpisode.jsx";
import History from "./History/History.jsx";
import Favorite from "./Favorite/Favorite.jsx";

import "bulma/css/bulma.min.css";
import "font-awesome/css/font-awesome.min.css";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="*" element={<NoMatch />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />

                    <Route path="/" element={<Home />} />
                    <Route path="/details/:tvshowId" element={<Details />} />
                    <Route path="/episodes/:seasonId" element={<SeasonEpisodes />} />
                    <Route path="/watchepisode/:episodeId" element={<WatchEpisode />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/favorite" element={<Favorite />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
