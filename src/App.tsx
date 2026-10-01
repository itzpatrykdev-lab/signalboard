import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ContentPage from "./pages/ContentPage";
import DashboardPage from "./pages/DashboardPage";
import PlayerPage from "./pages/PlayerPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import ScreenDetailsPage from "./pages/ScreenDetailsPage";
import ScreensPage from "./pages/ScreensPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="screens" element={<ScreensPage />} />
          <Route path="playlists" element={<PlaylistsPage />} />
          <Route path="content" element={<ContentPage />} />
        </Route>

        <Route path="player/:screenId" element={<PlayerPage />} />
        <Route path="screens/:screenId" element={<ScreenDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
