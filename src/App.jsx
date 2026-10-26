
import { useState } from "react";
import "./App.css";
function App() {
  const [skillCount, setSkillCount] = useState("");
  const [skills, setSkills] = useState([]);
  const [submittedSkills, setSubmittedSkills] = useState([]);
  const [error, setError] = useState("");
  // Generate input fields when the number changes
  const handleCountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSkillCount("");
      setSkills([]);
      setError("");
      return;
    }
    const count = Number(value);
    if (!Number.isInteger(count) || count < 1 || count > 7) {
      setSkillCount(value);
      setSkills([]);
      setError("Please enter a number between 1 and 7.");
      return;
    }
    setSkillCount(value);
    setSkills((previousSkills) =>
      Array.from(
        { length: count },
        (_, index) => previousSkills[index] || ""
      )
    );
    setError("");
  };
  // Update an individual skill input
  const handleSkillChange = (index, value) => {
    setSkills((previousSkills) =>
      previousSkills.map((skill, i) =>
        i === index ? value : skill
      )
    );
    setError("");
  };
  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!skillCount || Number(skillCount) < 1) {
      setError("Please enter how many skills you want to add.");
      return;
    }
    if (skills.some((skill) => skill.trim() === "")) {
      setError("Please fill in every skill field.");
      return;
    }
    setSubmittedSkills((previousSkills) => [
      ...previousSkills,
      ...skills.map((skill) => skill.trim()),
    ]);
    setError("");
  };
  // Reset the form
  const handleReset = () => {
    setSkillCount("");
    setSkills([]);
    setError("");
  };
  // Delete a submitted skill
  const handleDelete = (index) => {
    setSubmittedSkills((previousSkills) =>
      previousSkills.filter((_, i) => i !== index)
    );
  };
  return (
    <>
      <main className="container mt-5">
        <div className="row g-4">
          {/* Skill Form */}
          <div className="col-12 col-lg-5" id="skill-form">
            <div className="card h-100">
              <div className="card-body">
                <h4 className="card-title mb-4">Add Your Skills</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="skillCount" className="form-label">
                      How many skills do you want to add?
                    </label>
                    <input
                      id="skillCount"
                      type="number"
                      min="1"
                      max="7"
                      className="form-control"
                      placeholder="Enter number of skills"
                      value={skillCount}
                      onChange={handleCountChange}
                    />
                    <small className="text-muted">
                      You can add between 1 to 7 skills.
                    </small>
                  </div>
                  {skills.map((skill, index) => (
                    <div className="mb-3" key={index}>
                      <label
                        htmlFor={`skill-${index}`}
                        className="form-label"
                      >
                        Skill {index + 1}
                      </label>
                      <input
                        id={`skill-${index}`}
                        type="text"
                        className="form-control"
                        placeholder={`Enter skill ${index + 1}`}
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}

                  {error && (
                    <div className="alert alert-danger py-2" role="alert">
                      {error}
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary me-2">
                    Submit
                  </button>

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Submitted Skills Table */}
          <div className="col-12 col-lg-7" id="skill-list">
            <div className="card h-100">
              <div className="card-body">
                <h4 className="card-title mb-4">My Skills List</h4>

                {submittedSkills.length === 0 ? (
                  <p className="text-muted">
                    No skills added yet. Submit your skills to see them here.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Skill</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submittedSkills.map((skill, index) => (
                          <tr key={`${skill}-${index}`}>
                            <td>{index + 1}</td>
                            <td>{skill}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(index)}
                                aria-label={`Delete ${skill}`}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default App;