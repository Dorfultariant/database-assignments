import { useEffect, useState } from "react";
import type { GigBandOrgModel } from "../models/models";
import { getAllGigs } from "../api/gigsApi";

export function useGigs() {
  const [gigs, setGigs] = useState<GigBandOrgModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadGigs() {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllGigs();

      setGigs(data);
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
    loadGigs();
  }, []);

  return {
    gigs,
    loading,
    error,
    reload: loadGigs,
  };
}

