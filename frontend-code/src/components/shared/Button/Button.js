import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { initialValues } from 'utils/helper'

const AddButton = ({ isRedirect, text, setSelectedFunc, addModal }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        setSelectedFunc(initialValues())
        addModal.onOpen();
        if (isRedirect) {
            navigate("/admin/create-employee");
        }
    }

    return (
        <Button my="15px" display='flex' onClick={handleClick} _hover={{ opacity: "0.7" }}
            fontSize="14px"
            color="white"
            bg="#184780"
            size="md">
            {text}
        </Button>
    )
}

export default AddButton