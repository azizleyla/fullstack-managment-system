import React from "react";
import { NavLink } from "react-router-dom";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { AtSignIcon, CalendarIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa"
import { PiTreeStructureLight } from "react-icons/pi";

const Sidebar = () => {
    return (
        <List color="white" spacing={4}>
            <ListItem>
                <NavLink to="/">
                    <ListIcon as={CalendarIcon} />
                    Dashboard
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/admin/department">
                    <ListIcon as={PiTreeStructureLight} />
                    Department
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/admin/employee-list">
                    <ListIcon as={FaUser} />
                    Employee List
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/admin/create-employee">
                    <ListIcon as={FaUser} />
                    Create Employee
                </NavLink>
            </ListItem>
        </List>
    );
};

export default Sidebar;
