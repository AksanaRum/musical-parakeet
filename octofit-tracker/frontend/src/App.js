import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logoImage from './octofitapp-small.png';
import './App.css';
import ActivitiesComponent from './components/Activities';
import LeaderboardComponent from './components/Leaderboard';
import TeamsComponent from './components/Teams';
import UsersComponent from './components/Users';
import WorkoutsComponent from './components/Workouts';

const initialActivities = [
  { id: 1, date: '2026-03-25', activity: 'Running', duration: 30, calories: 290 },
  { id: 2, date: '2026-03-26', activity: 'Cycling', duration: 45, calories: 430 },
  { id: 3, date: '2026-03-27', activity: 'Yoga', duration: 60, calories: 200 },
];

function App() {
  const [activities, setActivities] = useState(initialActivities);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ date: '', activity: '', duration: '', calories: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddActivity = (ev) => {
    ev.preventDefault();
    const nextId = activities.length ? Math.max(...activities.map((a) => a.id)) + 1 : 1;
    const newActivity = {
      id: nextId,
      date: form.date || new Date().toISOString().slice(0, 10),
      activity: form.activity || 'New activity',
      duration: Number(form.duration) || 30,
      calories: Number(form.calories) || 100,
    };

    setActivities((prev) => [...prev, newActivity]);
    setForm({ date: '', activity: '', duration: '', calories: '' });
    setShowModal(false);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient">
        <div className="container-fluid align-items-center">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logoImage} alt="OctoFit" className="octofit-logo me-2" />
            <span>OctoFit Tracker</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#help">
                  Help
                </a>
              </li>
              <li className="nav-item">
                <button className="btn btn-light btn-sm" onClick={() => setShowModal(true)}>
                  + Add Activity
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/activities" element={<ActivitiesComponent />} />
        <Route path="/leaderboard" element={<LeaderboardComponent />} />
        <Route path="/teams" element={<TeamsComponent />} />
        <Route path="/users" element={<UsersComponent />} />
        <Route path="/workouts" element={<WorkoutsComponent />} />
        <Route path="/" element={
          <div>
            <main className="container py-4">
              <header className="mb-4 text-center">
                <h1 className="display-6 fw-bold">OctoFit Activity Dashboard</h1>
              </header>

              <section className="row" id="stats">
                <div className="col-lg-4 mb-3">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h2 className="card-title h5">Total Sessions</h2>
                      <p className="card-text fs-2 text-primary">{activities.length}</p>
                      <button className="btn btn-outline-primary btn-sm">View details</button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h2 className="card-title h5">Total Minutes</h2>
                      <p className="card-text fs-2 text-success">
                        {activities.reduce((sum, item) => sum + item.duration, 0)}
                      </p>
                      <button className="btn btn-outline-success btn-sm">View details</button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h2 className="card-title h5">Total Calories</h2>
                      <p className="card-text fs-2 text-danger">
                        {activities.reduce((sum, item) => sum + item.calories, 0)}
                      </p>
                      <button className="btn btn-outline-danger btn-sm">View details</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="card mb-4" id="log">
                <div className="card-body">
                  <h2 className="card-title h4">Recent Activity Log</h2>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Activity</th>
                          <th>Duration (min)</th>
                          <th>Calories</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activities.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.date}</td>
                            <td>{item.activity}</td>
                            <td>{item.duration}</td>
                            <td>{item.calories}</td>
                            <td>
                              <button className="btn btn-danger btn-sm" onClick={() => setActivities((prev) => prev.filter((x) => x.id !== item.id))}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>
                    Add new activity
                  </button>
                </div>
              </section>

              <section className="card mb-4" id="help">
                <div className="card-body">
                  <h2 className="card-title h4">Quick Form</h2>
                  <form onSubmit={handleAddActivity} className="row gy-2 gx-3 align-items-center">
                    <div className="col-sm-3">
                      <label htmlFor="date" className="form-label">
                        Date
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        className="form-control"
                        value={form.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-sm-3">
                      <label htmlFor="activity" className="form-label">
                        Activity
                      </label>
                      <input
                        id="activity"
                        name="activity"
                        className="form-control"
                        placeholder="e.g., Running"
                        value={form.activity}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-sm-2">
                      <label htmlFor="duration" className="form-label">
                        Duration
                      </label>
                      <input
                        id="duration"
                        name="duration"
                        type="number"
                        min="1"
                        className="form-control"
                        value={form.duration}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-sm-2">
                      <label htmlFor="calories" className="form-label">
                        Calories
                      </label>
                      <input
                        id="calories"
                        name="calories"
                        type="number"
                        min="0"
                        className="form-control"
                        value={form.calories}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-sm-2 align-self-end">
                      <button type="submit" className="btn btn-success w-100">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </main>

            {showModal && (
              <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Activity</h5>
                      <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close" />
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleAddActivity}> 
                        <div className="mb-3">
                          <label htmlFor="modalDate" className="form-label">
                            Date
                          </label>
                          <input
                            id="modalDate"
                            name="date"
                            type="date"
                            className="form-control"
                            value={form.date}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="modalActivity" className="form-label">
                            Activity
                          </label>
                          <input
                            id="modalActivity"
                            name="activity"
                            className="form-control"
                            value={form.activity}
                            onChange={handleInputChange}
                            placeholder="e.g., Swimming"
                          />
                        </div>
                        <div className="row">
                          <div className="mb-3 col-6">
                            <label htmlFor="modalDuration" className="form-label">
                              Duration
                            </label>
                            <input
                              id="modalDuration"
                              name="duration"
                              type="number"
                              className="form-control"
                              value={form.duration}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-3 col-6">
                            <label htmlFor="modalCalories" className="form-label">
                              Calories
                            </label>
                            <input
                              id="modalCalories"
                              name="calories"
                              type="number"
                              className="form-control"
                              value={form.calories}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                            Cancel
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Add activity
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>} />
        </Routes>
    </div>
  );
}

export default App;
