import { FaUser } from "react-icons/fa";
import { PiTreeStructureLight } from "react-icons/pi";

export const baseUrl = process.env.REACT_APP_BASE_URL;

export const sidebarLinks = [

    { id: 1, path: "/admin/department", icon: PiTreeStructureLight, text: "Department" },
    { id: 2, path: "/admin/employee-list", icon: FaUser, text: "Employee List" },
    { id: 3, path: "/admin/create-employee", icon: FaUser, text: "Create Employee" },
]