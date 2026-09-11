import { useEffect, useState } from "react";
import type { SongModel } from "../models/models";
import { getAllSongs } from "../api/musicApi";

export function useSongs() {
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadSongs() {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllSongs();

      setSongs(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load songs",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSongs();
  }, []);

  return {
    songs,
    loading,
    error,
    reload: loadSongs,
  };
}

