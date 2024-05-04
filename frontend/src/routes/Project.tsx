import Loading from "@components/Loading";
import Kanban from "@features/tasks/components/Kanban";
import TaskBoard from "@features/tasks/components/TasksBoard";
import IProject from "@interfaces/IProject";
import Typography from "@mui/material/Typography";
import ProjectsService from "@services/ProjectsService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Project() {
  const { id } = useParams();
  const [projectData, setItemData] = useState<IProject | null>(null);

  useEffect(() => {
    if (id) {
      ProjectsService.getProject(id).then((data: IProject | null) => {
        setItemData(data);
      });
    }
  }, [id]);

  if (!projectData) {
    return <Loading />;
  }
  return (
    <>
      <Typography>
        <h1>{projectData?.name}</h1>
        <div>
          <div>
            <p>{projectData?.description}</p>
          </div>
        </div>
      </Typography>
      {/* <TaskBoard /> */}
      <Kanban projectData={projectData} />
    </>
  );
}
