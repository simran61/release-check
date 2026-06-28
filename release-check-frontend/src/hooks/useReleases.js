import { useEffect, useState } from "react";
import { releaseData } from "../data/releaseData.js";
import { createEmptySteps } from "../data/steps.js";
import { loadReleases, saveReleases } from "../utils/storage.js";

export const useReleases = () => {
  const [releases, setReleases] = useState(() => loadReleases(releaseData));

  useEffect(() => {
    saveReleases(releases);
  }, [releases]);

  const addRelease = () => {
    const newRelease = {
      id: Date.now(),
      release: "New release",
      date: "",
      stepsCompleted: createEmptySteps(),
      additionalText: "",
    };
    setReleases((prev) => [...prev, newRelease]);
    return newRelease.id;
  };

  const updateRelease = (id, updates) => {
    setReleases((prev) =>
      prev.map((release) =>
        release.id === id ? { ...release, ...updates } : release
      )
    );
  };

  const deleteRelease = (id) => {
    setReleases((prev) => prev.filter((release) => release.id !== id));
  };

  return { releases, addRelease, updateRelease, deleteRelease };
};
