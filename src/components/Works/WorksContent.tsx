import { FC, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { data as ProjectData } from "../../data/projectdata";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Project } from "../../types/project";
import { MetaTags } from "../SEO/MetaTags";
import ProjectDetails from "./ProjectDetails";
import ProjectImages from "./ProjectImages";
import ProjectList from "./ProjectList";

const WorksContent: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 1200px)");

  const routeProject = ProjectData.find((project) => project.id === projectId);
  const isCollapsed = Boolean(
    (location.state as { collapsed?: boolean } | null)?.collapsed
  );
  const selectedId = routeProject
    ? routeProject.id
    : isCollapsed
    ? ""
    : ProjectData[0]?.id || "";

  const initialSelectedId = useRef(selectedId);

  useEffect(() => {
    const { connection } = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (connection?.saveData) return;

    const urls = [...ProjectData]
      .sort((a, b) =>
        a.id === initialSelectedId.current
          ? -1
          : b.id === initialSelectedId.current
          ? 1
          : 0
      )
      .flatMap((project) =>
        project.assets
          .filter((asset) => asset.type === "image")
          .map((asset) => asset.url)
      );

    let cancelled = false;
    const preload = (index: number) => {
      if (cancelled || index >= urls.length) return;
      const img = new Image();
      img.onload = img.onerror = () => preload(index + 1);
      img.src = urls[index];
    };
    preload(0);

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedProject =
    ProjectData.find((p) => p.id === selectedId) || ProjectData[0];

  useEffect(() => {
    if (projectId && !routeProject) {
      navigate("/work", { replace: true });
    }
  }, [projectId, routeProject, navigate]);

  const handleProjectSelect = (project: Project) => {
    const isDeselecting = isMobile && project.id === selectedId;

    if (isDeselecting) {
      navigate("/work", { state: { collapsed: true } });
      return;
    }

    if (project.id === projectId) return;

    navigate(`/work/${project.id}`);
  };

  return (
    <>
      <MetaTags
        title={
          routeProject ? `${routeProject.title} | Work | Talade` : "Work | Talade"
        }
        description={
          routeProject
            ? routeProject.shortDescription
            : "Selected product engineering work across web and mobile, including B2B platforms, healthcare products and operational tools."
        }
      />
      <Container>
        {isMobile ? (
          <ProjectList
            projects={ProjectData}
            selectedId={selectedId}
            onSelectProject={handleProjectSelect}
          />
        ) : (
          <DesktopLayout>
            <ProjectList
              projects={ProjectData}
              selectedId={selectedId}
              onSelectProject={handleProjectSelect}
            />
            <ProjectDetails
              key={`details-${selectedProject.id}`}
              project={selectedProject}
            />
            <ProjectImages
              key={`images-${selectedProject.id}`}
              project={selectedProject}
            />
          </DesktopLayout>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;

  @media (max-width: 1200px) {
    height: calc(100dvh - 60px);
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

const DesktopLayout = styled.div`
  display: none;
  height: 100%;
  grid-template-columns: minmax(240px, 0.7fr) minmax(320px, 1fr) minmax(
      280px,
      1fr
    );

  @media (min-width: 1200px) {
    display: grid;
  }
`;

export default WorksContent;
