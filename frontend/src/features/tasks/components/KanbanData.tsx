import ITask from "@interfaces/ITask";

export interface KanBanItem {
  [key: string]: {
    title: string;
    items: ITask[];
  };
}
export const data: ITask[] = [
  {
    id: "1",
    description: "",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    assignedTo: "Beltran",
    // Assignee: 'Romona',
    status: "To-do",
    // Priority: 'Low',
    dueDate: "25-May-2020",
  },
  {
    id: "2",
    description: "",

    title: "Fix Styling",
    assignedTo: "Dave",
    // Assignee: 'Romona',
    status: "To-do",
    // Priority: 'Low',
    dueDate: "26-May-2020",
  },
  {
    id: "3",
    description: "",

    title: "Handle Door Specs",
    assignedTo: "Roman",
    // Assignee: 'Romona',
    status: "To-do",
    // Priority: 'Low',
    dueDate: "27-May-2020",
  },
  {
    id: "4",
    description: "",

    title: "morbi",
    assignedTo: "Gawen",
    // Assignee: 'Kai',
    status: "Done",
    // Priority: 'High',
    dueDate: "23-Aug-2020",
  },
  {
    id: "5",
    description: "",

    title: "proin",
    assignedTo: "Bondon",
    // Assignee: 'Antoinette',
    status: "In Progress",
    // Priority: 'Medium',
    dueDate: "05-Jan-2021",
  },
];

export const columns: string[] = ["To-do", "In Progress", "Done"];

export const columnsFromBackend = {
  ["1"]: {
    title: "To-do",
    items: data,
  },
  ["2"]: {
    title: "In Progress",
    items: [],
  },
  ["3"]: {
    title: "Done",
    items: [],
  },
};
