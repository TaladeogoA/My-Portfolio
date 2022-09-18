import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import projects from "../../projectdata";

const WorkDetails = () => {
  const [project, setProject] = useState("");

  const { projectId } = useParams();

  // useEffect(() => {
  //   // Find the project with the id that matches the projectId we get from the URL with useParams
  //   let project = projects.find((project) => project.id === projectId);
  //   // Set the project state to the singleProject we found
  //   setProject(project);

  // }, [projectId]);

  return (
    <div className="container">
      <ul>{project && JSON.stringify(project)}</ul>
      <h1>WorkDetails</h1>
    </div>
  );
};

export default WorkDetails;
