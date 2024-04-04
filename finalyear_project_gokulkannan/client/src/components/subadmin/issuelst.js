// IssueList.js
import axios from "axios";
import { useEffect, useState } from "react";
import SubAdminNavbar from "./navbarsubadmin";
import "../css/issue.css"; // Import CSS file for extra styles

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("/auth/fetchissue")
      .then((response) => setIssues(response.data))
      .catch((err) => console.error(err));
  }, []);

  // Function to handle status update for an issue
  const handleStatusUpdate = async (issueId, newStatus) => {
    try {
      // Send a PUT request to update the issue status
      const response = await axios.put(`/auth/updateissuestatus/${issueId}`, { status: newStatus });
      
      // Check if the request was successful (status code 200)
      if (response.status === 200) {
        // Update the status of the corresponding issue in the local state
        setIssues((prevIssues) =>
          prevIssues.map((issue) =>
            issue._id === issueId ? { ...issue, status: newStatus } : issue
          )
        );
      } else {
        // Handle unsuccessful request
        console.error("Failed to update issue status:", response.data);
      }
    } catch (error) {
      // Handle network or server error
      console.error("Error updating issue status:", error);
      // Optionally, you can also show an error message to the user
    }
  };

  // Filter issues based on search query
  const filteredIssues = issues.filter((issue) =>
    issue.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SubAdminNavbar />
      <div className="issue-list-container">
        {/* Search Box */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredIssues.map((issue) => (
          <div key={issue._id} className="issue-card">
            <h3>Name: {issue.userName}</h3>
            <p>Title: {issue.title}</p>
            <p>Description: {issue.description}</p>
            <p>Location: {issue.location}</p>
            <p>Category: {issue.category}</p>
            <p>Status: {issue.status}</p>
            
            {/* Conditionally render dropdown menu for status update */}
            {issue.status !== "completed" && (
              <select onChange={(e) => handleStatusUpdate(issue._id, e.target.value)}>
                <option value="in_progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default IssueList;
