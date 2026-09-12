// import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import LoginPage from "./pages/LoginPage.tsx";
import DatabasePage from "./pages/DatabasePage.tsx";
import MusicPage from "./pages/MusicPage.tsx";
import SongPage from "./pages/SongPage.tsx";
import GigsPage from "./pages/GigPage.tsx";
import EventPage from "./pages/EventPage.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

function App() {
  return (
    <section id="center">
      <BrowserRouter>
        {/* 
          Basically, what we want  is to by default the need to login / register (same path) 
          and then show the available databases once authenticated, it appears that using react router is a 
          relatively good way to achieve this within this small app, even though simpler solutions exist. 
          
            However, this once again moves the project work forward so it is implemented here as well 
              for target practice. 
          */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/databases" element={<DatabasePage />} />
            {/* Other protected routes that show the database contents */}
            <Route path="/music" element={<MusicPage />} />
            <Route path="/music/songs" element={<SongPage />} />
            {/* <Route path="/music/bands" element={<SongPage />} /> */}
            {/* <Route path="/music/albums" element={<SongPage />} /> */}
            <Route path="/gigs" element={<EventPage />} />
            <Route path="/gigs/gig-band-org" element={<GigsPage />} />
          </Route>

          {/* Redirect for unauthenticated users back to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter >
      <section id="spacer"></section>
    </section>
  );
}

export default App
