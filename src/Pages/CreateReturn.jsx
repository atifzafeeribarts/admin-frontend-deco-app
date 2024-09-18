import React from 'react'
import AdminReturnCreateContext from '../Context/AdminReturnCreateContext'
import CreateMain from './../Components/CreateReturn/CreateMain';

const CreateReturn = () => {
    return (
        <AdminReturnCreateContext>
            <CreateMain />
        </AdminReturnCreateContext>
    )
}

export default CreateReturn