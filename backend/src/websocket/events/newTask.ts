export default async function exampleEvent(
  { projectId, columnId }: { projectId: string; columnId: string },
  callback: (data: any) => void
) {
  try {
    if (!callback) {
      callback = () => null;
    }

    callback({
      success: true,
      param: "param",
      message: "created successfully",
    });
  } catch (error) {
    console.error("Error creating task:", error);
    callback({ success: false, message: "Failed to create" });
  }
}
