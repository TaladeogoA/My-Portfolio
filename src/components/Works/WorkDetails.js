import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import projects from "../../projectdata";

const WorkDetails = () => {
  const [projectData, setProjectData] = useState([]);

  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      const localData = localStorage.getItem(`project${projectId}`);
      setProjectData([JSON.parse(localData)]);
    }
    return () => {
      localStorage.removeItem(`project${projectId}`);
    };
  }, [projectId]);

  return (
    <div className="container">
      {projectData.length > 0 &&
        projectData.map((data) => {
          return <p key={data?.id}>{data?.title}</p>;
        })}
    </div>
  );
};

export default WorkDetails;
