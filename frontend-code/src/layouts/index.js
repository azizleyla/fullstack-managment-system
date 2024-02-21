import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Outlet } from "react-router-dom"
import { Grid, GridItem, Icon, ListIcon, MenuIcon, Text } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CalendarIcon } from '@chakra-ui/icons';

import { IoIosClose } from "react-icons/io";

const Layout = () => {
    const [isOpen, setIsOpen] = useState(true);

    const closeSidebar = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <Grid bg="gray.50">
                <GridItem
                    overflow="hidden"
                    position="fixed"
                    top="0"
                    bottom="0"
                    width={isOpen ? '270px' : '70px'}
                    minHeight={{ lg: "100vh" }}
                    as="aside"
                    colSpan={{ base: 6, lg: 2, xl: 2 }}
                    bg="brand.500"
                >
                    <Sidebar isOpen={isOpen} />
                </GridItem>

                <GridItem ml={isOpen ? "270px" : "70px"} as="main" p="40px" colSpan={{ base: 6, lg: 4, xl: 5 }}>
                    <button onClick={closeSidebar}>
                        {isOpen ? <Icon fontSize="22px" as={RxHamburgerMenu} />
                            : <Icon fontSize="35px" as={IoIosClose} />

                        }

                    </button>

                    <Outlet />
                </GridItem>
                {/* <Footer /> */}
            </Grid >
        </>

    )
}

export default Layout