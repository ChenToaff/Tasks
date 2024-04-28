import IProject from "@interfaces/IProject";
import Typography from "@mui/material/Typography";
import ProjectsService from "@services/ProjectsService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Project() {
  const { id } = useParams();
  const [itemData, setItemData] = useState<IProject | null>(null);

  useEffect(() => {
    if (id) {
      ProjectsService.getProject(id).then((data: IProject | null) =>
        setItemData(data)
      );
    }
  }, [id]);
  return (
    <Typography>
      Project page{" "}
      {
        <div>
          {itemData ? (
            <div>
              <h1>{itemData.name}</h1>
              <p>{itemData.description}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      }
    </Typography>
  );
}
