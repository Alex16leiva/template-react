import { useEffect, useState, useCallback } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Container, Title, DataGridContainer } from './UserStyle';
import { ApiCalls } from '../../../Services/ApiCalls';
import { utilsValidator } from '../../../Helpers/utils/utilsValidator';
import { SearchControl } from '../../../components/Controls/SearchControl';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { EdicionUser } from './EdicionUser';

export const UserScreen = () => {
    const [users, setUsers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [open, setOpen] = useState(false);

    const columns = [
        { field: 'usuarioId', headerName: 'Usuario Id', width: 150 },
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido', headerName: 'Apellido', width: 200 },
        { field: 'rolId', headerName: 'Rol Id', width: 200 },
        {
            field: 'fechaTransaccion',
            headerName: 'Date Modifier',
            width: 180,
            type: 'dateTime',
            valueGetter: (value) => value ? new Date(value) : null,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => [
                <GridActionsCellItem
                    key={id}
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => handleEditClick(id)}
                    color="inherit"
                />
            ]
        }
    ];

    const fetchUsers = useCallback((pageIndex, pageSize) => {
        const request = {
            queryInfo: {
                pageIndex,
                pageSize,
                sortFields: ['FechaTransaccion'],
                ascending: false,
                predicate: !utilsValidator.isNullOrEmpty(searchValue) ? 'usuarioId.Contains(@0)' : '',
                paramValues: !utilsValidator.isNullOrEmpty(searchValue) ? [searchValue] : [],
            }
        };

        ApiCalls.httpPost('user/obtener-usuarios', request)
            .then(response => {
                if (response) {
                    setTotalItems(response.totalItems);
                    setUsers(response.items);
                }
            });
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

    const handleEditClick = (id) => {
        console.log(id);

        // Logic to handle editing can be added here
        setOpen(true);
    };

    const showAddPanel = () => {
        console.log('click');

        setOpen(true);
    };

    const handleHidePanelClick = () => {
        console.log('Hiciste click en el botón de cerrar');

        setOpen(false);
    };

    const CustomToolbar = () => (
        <GridToolbarContainer>
            <GridToolbarExport
                printOptions={{ disableToolbarButton: true }}
                csvOptions={{ fileName: 'customerDataBase', utf8WithBom: true }}
            />
        </GridToolbarContainer>
    );

    return (
        <Container>
            <Title>Administración de Usuarios</Title>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <SearchControl
                    width={250}
                    textSearch='Buscar Usuario'
                    onBlur={handleSearch}
                    onChange={(event) => setSearchValue(event.target.value)}
                    onKeyDown={handleKeyPress}
                    value={searchValue}
                />
                <Box sx={{ alignContent: 'center' }}>
                    <Button variant="contained" onClick={() => showAddPanel}>Add user</Button>
                </Box>
            </Box>
            <DataGridContainer>
                <DataGrid
                    rows={users}
                    columns={columns}
                    checkboxSelection
                    rowCount={totalItems}
                    pageSizeOptions={[5, 10, 25]}
                    onPaginationModelChange={onChangePage}
                    paginationMode='server'
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize,
                                page: pageIndex
                            },
                        },
                    }}
                    slots={{ toolbar: CustomToolbar }}
                    getRowId={(row) => `${row.usuarioId}-${row.fechaTransaccion}`}
                />
            </DataGridContainer>
            <EdicionUser open={open} hideAddPanel={() => handleHidePanelClick} />
        </Container>
    );
};
