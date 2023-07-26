import React from "react";
import {FaTrash, FaEdit} from 'react-icons/fa'
import {Table, Thead, Tr, Th, Tbody, Td } from './style'
import axios from 'axios'
import {toast} from 'react-toastify'

function Grid({users, setUsers, setOnEdit}) {

    const handleEdit = (item) => {
        setOnEdit(item)
    }

    const handleDelete = async (id) => {
        await axios
            .delete('http://localhost:8800/' + id)
            .then(({data}) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({data}) => toast.error(data))
    }

    return (
        <Table>
            <Thead>
            <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Fone</Th>
                {/* <Th onlyWeb >Data Nascimento</Th> */}
                <Th></Th>
                <Th></Th>
            </Tr>
            </Thead>

            <Tbody>
                {
                    users.map((item,i) => (
                        <Tr key={i}>
                            <Td width="30%">{item.name}</Td>
                            <Td width="30%">{item.email}</Td>
                            <Td width="20%" onlyWeb>{item.fone}</Td>
                            <Td alignCenter width="5%">
                                <FaEdit onClick={() => handleEdit(item)} />
                            </Td>
                            <Td alignCenter width="5%">
                                <FaTrash onClick={() => handleDelete(item.id)}/>
                            </Td>
                        </Tr>
                    ))
                }
            </Tbody>
        </Table>
    )
}

export default Grid