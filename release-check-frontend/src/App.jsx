import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ReleaseTable from "./components/ReleaseTable/ReleaseTable";
import ReleaseDetail from "./components/ReleaseDetail/ReleaseDetail";
import { useReleases } from "./hooks/useReleases.js";

function App() {
  const { releases, addRelease, updateRelease, deleteRelease } =
    useReleases();

  return (
    <BrowserRouter>
      <div className="app">
        <h1>ReleaseCheck</h1>
        <p>Your all-in-one release checklist tool</p>
        <Routes>
          <Route
            path="/"
            element={
              <ReleaseTable
                releases={releases}
                onAddRelease={addRelease}
                onDeleteRelease={deleteRelease}
              />
            }
          />
          <Route
            path="/releases/:id"
            element={
              <ReleaseDetail
                releases={releases}
                onUpdateRelease={updateRelease}
                onDeleteRelease={deleteRelease}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
