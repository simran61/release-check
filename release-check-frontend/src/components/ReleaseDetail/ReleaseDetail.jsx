import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./releaseDetail.css";
import { STEPS, createEmptySteps } from "../../data/steps.js";
import { validateRelease } from "../../utils/validateRelease.js";
import { MdDeleteForever } from "react-icons/md";

const ReleaseDetail = ({ releases, onUpdateRelease, onDeleteRelease }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const release = releases.find((data) => String(data.id) === id);

  const [name, setName] = useState(release?.release ?? "");
  const [date, setDate] = useState(release?.date ?? "");
  const [stepsCompleted, setStepsCompleted] = useState(
    release?.stepsCompleted ?? createEmptySteps()
  );
  const [additionalText, setAdditionalText] = useState(
    release?.additionalText ?? ""
  );
  const [errors, setErrors] = useState({});

  if (!release) {
    return (
      <div className="card">
        <p>Release not found.</p>
        <Link to="/">Back to all releases</Link>
      </div>
    );
  }

  const toggleStep = (index) => {
    setStepsCompleted((prev) =>
      prev.map((completed, i) => (i === index ? !completed : completed))
    );
  };

  const handleSave = () => {
    const newErrors = validateRelease({ name, date });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpdateRelease(release.id, {
      release: name.trim(),
      date: date.trim(),
      stepsCompleted,
      additionalText,
    });
    navigate("/");
  };

  const handleDelete = () => {
    onDeleteRelease(release.id);
    navigate("/");
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            All releases
          </Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{release.release}</span>
        </div>
        <button className="btn-primary" onClick={handleDelete}>
          Delete <MdDeleteForever />
        </button>
      </div>

      <div className="detail-body">
        <div className="field-row">
          <div className="field">
            <label>Release</label>
            <input
              type="text"
              className={errors.name ? "input-error" : ""}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: undefined }));
              }}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
          <div className="field">
            <label>Date</label>
            <input
              type="text"
              className={errors.date ? "input-error" : ""}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setErrors((prev) => ({ ...prev, date: undefined }));
              }}
            />
            {errors.date && <span className="field-error">{errors.date}</span>}
          </div>
        </div>

        <div className="steps-list">
          {STEPS.map((step, index) => (
            <label className="step-item" key={step}>
              <input
                type="checkbox"
                checked={stepsCompleted[index]}
                onChange={() => toggleStep(index)}
              />
              {step}
            </label>
          ))}
        </div>

        <div className="field">
          <label>Additional remarks / tasks</label>
          <textarea
            placeholder="Please enter any other important notes for the release"
            value={additionalText}
            onChange={(e) => setAdditionalText(e.target.value)}
          />
        </div>

        <div className="detail-footer">
          <button className="btn-primary" onClick={handleSave}>
            Save ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReleaseDetail;
