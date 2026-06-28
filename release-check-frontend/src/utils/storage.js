const STORAGE_KEY = "releasecheck:releases";

export const loadReleases = (fallback) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const saveReleases = (releases) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(releases));
    return true;
  } catch {
    return false;
  }
};
