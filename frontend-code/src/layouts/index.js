import React from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Outlet } from "react-router-dom"
import { Grid, GridItem } from "@chakra-ui/react";


const Layout = () => {
    return (
        <>
            <Grid templateColumns="repeat(6,1fr)" bg="gray.50">
                <GridItem
                    p={{ base: "20px", lg: "30px" }}
                    minHeight={{ lg: "100vh" }}
                    as="aside"
                    colSpan={{ base: 6, lg: 2, xl: 1 }}
                    bg="brand.500"
                >
                    <Sidebar />
                </GridItem>

                <GridItem as="main" p="40px" colSpan={{ base: 6, lg: 4, xl: 5 }}>

                    <Outlet />
                </GridItem>
                {/* <Footer /> */}
            </Grid>
        </>

    )
}

export default Layout