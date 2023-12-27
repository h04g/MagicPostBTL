import { Briefcase, ListTask, People, Bullseye } from "react-bootstrap-icons";

export const ProjectsStats = [
  {
    id: 1,
    title: "Đơn hàng đến",
    value: 18,
    icon: <Briefcase size={18} />,
   
  },
  {
    id: 2,
    title: "Đơn hàng đi",
    value: 132,
    icon: <ListTask size={18} />,
    
  },
  {
    id: 3,
    title: "Đang giao",
    value: 12,
    icon: <People size={18} />,
    
  },
  {
    id: 4,
    title: "Đã giao thành công",
    value: "76%",
    icon: <Bullseye size={18} />,
    
  },
];
export default ProjectsStats;
