import { Link, useNavigate } from "react-router-dom";
import "./releaseTable.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { getStatus } from "../../utils/getStatus.js";

const ReleaseTable = ({ releases, onAddRelease, onDeleteRelease }) => {
  const navigate = useNavigate();

  const handleAddRelease = () => {
    const newId = onAddRelease();
    navigate(`/releases/${newId}`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <button className="btn-view-all-releases">All releases</button>
        <button className="btn-add-release btn-primary" onClick={handleAddRelease}>
          New release <IoIosAddCircleOutline />
        </button>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Release</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {releases.map((data) => (
              <tr key={data.id}>
                <td>{data.release}</td>
                <td>{data.date}</td>
                <td>{getStatus(data.stepsCompleted)}</td>
                <td>
                  <Link to={`/releases/${data.id}`} className="action-cell">
                    View <FaEye />
                  </Link>
                </td>
                <td>
                  <button
                    className="action-cell"
                    onClick={() => onDeleteRelease(data.id)}
                  >
                    Delete <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReleaseTable;
