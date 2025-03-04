import { useEffect, useState, useCallback } from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Container, Title, DataGridContainer } from './UserStyle';
import { ApiCalls } from '../../../Services/ApiCalls';
import { utilsValidator } from '../../../Helpers/utils/utilsValidator';
import { SearchControl } from '../../../components/Controls/SearchControl';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AgregarUser } from './AgregarUser';
import { EditarUser } from './EditarUser';
import { DataGridControl } from '../../../components/Controls/DataGridControl';

export const UserScreen = () => {
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [userSelected, setUserSelected] = useState({});
    const [openEdit, setOpenEdit] = useState(false);

    const columns = [
        { field: 'usuarioId', headerName: 'Usuario Id', width: 150 },
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido', headerName: 'Apellido', width: 200 },
        { field: 'rolId', headerName: 'Rol Id', width: 200 },
        {
            field: 'fechaTransaccion',
            headerName: 'Fecha Modificación',
            width: 180,
            type: 'dateTime',
            valueGetter: (value) => value ? new Date(value) : null,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Editar',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id, row }) => [
                <GridActionsCellItem
                    key={id}
                    icon={<EditIcon />}
                    label="Editar"
                    className="textPrimary"
                    onClick={() => handleEditClick(row)}
                    color="inherit"
                />
            ]
        }
    ];

    const fetchUsers = useCallback(async (pageIndex, pageSize) => {
        const request = {
            queryInfo: {
                pageIndex,
                pageSize,
                sortFields: ['FechaTransaccion'],
                ascending: false,
                predicate: utilsValidator.isNullOrEmpty(searchValue) ? '' : 'usuarioId.Contains(@0)',
                paramValues: utilsValidator.isNullOrEmpty(searchValue) ? [] : [searchValue],
            }
        };

        try {
            const response = await ApiCalls.httpPost('user/obtener-usuarios', request);
            if (response) {
                setTotalItems(response.totalItems);
                setUsers(response.items);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [searchValue]);

    useEffect(() => {
        fetchUsers(pageIndex, pageSize);
    }, [fetchUsers, pageIndex, pageSize]);

    const handleSearch = () => {
        fetchUsers(pageIndex, pageSize);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const onChangePage = (pageInfo) => {
        setPageIndex(pageInfo.page);
        setPageSize(pageInfo.pageSize);
        fetchUsers(pageInfo.page, pageInfo.pageSize);
    };

    const handleEditClick = (row) => {
        setUserSelected(row);
        setOpenEdit(true);
    };

    const showAddPanel = () => {
        setOpen(true);
    };

    const handleHidePanelClick = () => {
        setOpenEdit(false);
        setOpen(false);
    };

    return (
        <Container>
            <Title>Administración de Usuarios</Title>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <SearchControl
                    width={250}
                    textSearch='Buscar Usuario'
                    onBlur={handleSearch}
                    onClick={handleSearch}
                    onChange={(event) => setSearchValue(event.target.value)}
                    onKeyDown={handleKeyPress}
                    value={searchValue}
                />
                <Button variant="contained" onClick={showAddPanel}>Agregar Usuario</Button>
            </Box>
            <DataGridContainer>
                <DataGridControl
                    rowId={'usuarioId'}
                    rows={users}
                    columns={columns}
                    onChangePage={onChangePage}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                    fileExcelName={'Usuarios'}
                    pageSizeOptions={[10, 50, 100]}
                />
            </DataGridContainer>
            <AgregarUser open={open} hideAddPanel={handleHidePanelClick} cargarData={handleSearch} />
            <EditarUser open={openEdit} hideEditPanel={handleHidePanelClick} cargarData={handleSearch} usuarioSeleccionado={userSelected} />
        </Container>
    );
};
