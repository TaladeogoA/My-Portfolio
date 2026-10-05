import { FC, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { data as ProjectData } from "../../data/projectdata";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Project } from "../../types/project";
import { VisuallyHidden } from "../Common/VisuallyHidden";
import { MetaTags } from "../SEO/MetaTags";
import ProjectDetails from "./ProjectDetails";
import ProjectImages from "./ProjectImages";
import ProjectList from "./ProjectList";

const SLOW_CONNECTIONS = ["slow-2g", "2g", "3g"];

const WorksContent: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 1200px)");

  const routeProject = ProjectData.find((project) => project.id === projectId);
  const isCollapsed = Boolean(
    (location.state as { collapsed?: boolean } | null)?.collapsed,
  );
  const selectedId = routeProject
    ? routeProject.id
    : isCollapsed
      ? ""
      : ProjectData[0]?.id || "";

  const initialSelectedId = useRef(selectedId);
  const startedOnMobile = useRef(isMobile);

  useEffect(() => {
    if (startedOnMobile.current) return;

    const { connection } = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (connection?.saveData) return;
    if (
      connection?.effectiveType &&
      SLOW_CONNECTIONS.includes(connection.effectiveType)
    ) {
      return;
    }

    const urls = [...ProjectData]
      .sort((a, b) =>
        a.id === initialSelectedId.current
          ? -1
          : b.id === initialSelectedId.current
            ? 1
            : 0,
      )
      .flatMap((project) =>
        project.assets
          .filter((asset) => asset.type === "image")
          .map((asset) => asset.url),
      );

    let cancelled = false;
    const preload = (index: number) => {
      if (cancelled || index >= urls.length) return;
      const img = new Image();
      img.onload = img.onerror = () => preload(index + 1);
      img.src = urls[index];
    };

    const idle = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (idle.requestIdleCallback && idle.cancelIdleCallback) {
      const id = idle.requestIdleCallback(() => preload(0), { timeout: 3000 });
      return () => {
        cancelled = true;
        idle.cancelIdleCallback?.(id);
      };
    }

    const timer = window.setTimeout(() => preload(0), 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  const selectedProject =
    ProjectData.find((p) => p.id === selectedId) || ProjectData[0];
  const selectedIndex = ProjectData.indexOf(selectedProject);
  const nextProject = ProjectData[(selectedIndex + 1) % ProjectData.length];

  useEffect(() => {
    if (projectId && !routeProject) {
      navigate("/work", { replace: true });
    }
  }, [projectId, routeProject, navigate]);

  const handleProjectSelect = (project: Project) => {
    if (project.id === selectedId) {
      navigate("/work", { state: { collapsed: true }, replace: true });
      return;
    }

    navigate(`/work/${project.id}`, { replace: true });
  };

  return (
    <>
      <MetaTags
        title={
          routeProject
            ? `${routeProject.title} | Work | Talade`
            : "Work | Talade"
        }
        description={
          routeProject
            ? routeProject.shortDescription
            : "Selected product engineering work across web and mobile, including B2B platforms, healthcare products and operational tools."
        }
      />
      <Container>
        <VisuallyHidden as="h1">Selected work</VisuallyHidden>
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
              nextProject={nextProject}
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
  height: 100%;
  overflow: hidden;
`;

const DesktopLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: minmax(240px, 0.7fr) minmax(360px, 1fr) minmax(
      280px,
      1fr
    );
`;

export default WorksContent;
