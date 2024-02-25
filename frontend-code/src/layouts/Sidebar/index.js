import React from "react";
import { Link, NavLink } from "react-router-dom";
import { List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { sidebarLinks } from "../../utils/constants";

const Sidebar = ({ isOpen }) => {
    return (
        <>
            <List color="white" spacing={4} my="20px">
                {isOpen && <Text borderBottom="1px solid #ffffff1a" textAlign="center" p="20px" fontSize="25px">UHelp</Text>}


                {sidebarLinks.map((link) => (
                    <ListItem key={link.id} color="#828DA5"
                        borderRadius="8px"
                        cursor="pointer"
                        transition="all 0.3s ease"
                        _hover={{ bg: "#3366FF", color: "#fff" }}>
                        <Link style={{ display: "block", width: "100%", padding: "10px 20px" }} to={link.path} >
                            <ListIcon as={link.icon} />
                            {isOpen && <span >{link.text}</span>}
                        </Link>
                    </ListItem>
                ))}
            </List >
        </>
    );
};

export default Sidebar;
