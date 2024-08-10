import { useEffect, useState, useCallback, useMemo } from 'react'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";
import { list, resetDB } from '../api/public.api'
import {
    useJsonToCsv
} from 'react-json-csv';
import { toast } from 'sonner'
import { GoDotFill } from "react-icons/go";
import { FaSearch } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";

const List = () => {
    const [users, setUsers] = useState([{ username: '', checkin: true }]);
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [filterValue, setFilterValue] = useState('');
    const hasSearchFilter = Boolean(filterValue);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isInvalid, setIsInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { saveAsCsv } = useJsonToCsv();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await list();
        setUsers(data.data);
    }

    const handleResetDB = async () => {
        if (user.username === "" || user.password === "") {
            setIsInvalid(true);
            setErrorMessage("Usuario o contraseña incorrectos.");
            return;
        }
        try {
            await resetDB(user);
            await fetchData();
            onOpenChange();
            setIsInvalid(false);
            setErrorMessage('');
        } catch (error) {
            setIsInvalid(true);
            setErrorMessage(error.response.data.message);
            console.error(error);
        }
    }

    const handleDownload = async () => {
        try {
            await fetchData();
            saveAsCsv({
                data: users,
                fields: { username: 'Nombre', checkin: 'Status' },
                filename: 'users'
            });
            toast.success('Descarga exitosa');
        } catch (error) {
            console.error(error);
            toast.error('Error al descargar');
        }
    }

    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.username.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredUsers;
    }, [users, filterValue]);

    const onSearchChange = useCallback((value) => { value ? setFilterValue(value) : setFilterValue("") }, []);

    const onClear = useCallback(() => setFilterValue(""), [])

    return (
        <>
            <div className='flex flex-col flex-1 justify-start h-screen w-full mt-24'>
                <div className='flex flex-row h-24 w-full justify-center items-stretch gap-2 px-5 pb-2'>
                    <Button isIconOnly variant="flat" color="danger" className='flex-1' onClick={() => onOpenChange()}>
                        <MdDelete size={24} />
                    </Button>
                    <Button isIconOnly variant="flat" color="primary" className='flex-1' onClick={() => handleDownload()}>
                        <IoMdDownload size={24} />
                    </Button>
                </div>
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
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                className="dark text-white"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Reiniciar Base de Datos</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Username"
                                    variant="bordered"
                                    isInvalid={isInvalid}
                                    onValueChange={(text) => setUser({ ...user, username: text })}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    variant="bordered"
                                    isInvalid={isInvalid}
                                    errorMessage={errorMessage}
                                    onValueChange={(text) => setUser({ ...user, password: text })}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={() => {
                                    setIsInvalid(false);
                                    setErrorMessage('');
                                    onClose()
                                }}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={() => handleResetDB()}>
                                    Reiniciar Base de Datos
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default List