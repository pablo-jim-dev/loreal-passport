import { useEffect, useState, useCallback, useMemo } from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Input } from '@nextui-org/react';
import { list } from '../api/public.api'
import { GoDotFill } from "react-icons/go";
import { FaSearch } from 'react-icons/fa';

const List = () => {
    const [users, setUsers] = useState([{ username: '', checkin: true }]);
    const [filterValue, setFilterValue] = useState('');

    const hasSearchFilter = Boolean(filterValue);

    useEffect(() => {
        const fetchData = async () => {
            const data = await list();
            setUsers(data.data);
        }
        fetchData();
    }, []);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.username.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredUsers;
    }, [users, filterValue]);

    const onSearchChange = useCallback((value) => {
        value ? setFilterValue(value) : setFilterValue("");
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("")
    }, [])

    return (
        <div className='flex flex-col flex-1 justify-start h-screen w-full mt-24'>
            <Input
                color="primary"
                variant="bordered"
                isClearable
                className="w-full px-5 text-[16px]"
                placeholder="Buscar por nombre"
                size='lg'
                startContent={<FaSearch />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
            />
            <Table aria-label='Users-Table'>
                <TableHeader>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn width={20}>Status</TableColumn>
                </TableHeader>
                <TableBody>
                    {filteredItems.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell className='flex flex-row items-center justify-start gap-2'>{user.username}</TableCell>
                            <TableCell>{user.checkin ? <GoDotFill color='#59FF88' size={28} /> : <GoDotFill color='#F76060' size={28} />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default List