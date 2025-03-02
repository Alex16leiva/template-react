import PropTypes from "prop-types";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify";
import { Box, Drawer, Fab, TextField, Tooltip } from "@mui/material"
import { useForm } from '../../../hooks/useForm';
import { ApiCalls } from "../../../Services/ApiCalls";
import { utilsValidator } from "../../../Helpers/utils/utilsValidator";
import { useEffect, useState } from "react";
import { ToggleSwitchControl } from "../../../components/Controls/ToggleSwitchControl";

export const EditarUser = ({
    open,
    hideEditPanel,
    cargarData,
    usuarioSeleccionado
}) => {
    const { usuarioId, nombre, apellido, rolId, contrasena, onInputChange, onResetForm } = useForm({
        usuarioId: '', nombre: '', apellido: '', rolId: '', contrasena: ''
    });
    const [editarContrasena, setEditarContrasena] = useState(false);

    useEffect(() => {
        if (usuarioSeleccionado) {
            onResetForm({
                usuarioId: usuarioSeleccionado.usuarioId ?? "",
                nombre: usuarioSeleccionado.nombre ?? "",
                apellido: usuarioSeleccionado.apellido ?? "",
                rolId: usuarioSeleccionado.rolId ?? "",
                contrasena: contrasena ?? ""
            });
        }
    }, [usuarioSeleccionado]);

    const save = () => {

        if (utilsValidator.isNullOrEmpty(rolId)) {
            return toast.warn('El rol Id es requerido.')
        }

        if (utilsValidator.isNullOrEmpty(usuarioId)) {
            return toast.warn('El usuario es requerido.')
        }

        if (utilsValidator.isNullOrEmpty(nombre)) {
            return toast.warn('El nombre es requerido.')
        }

        var request = {
            usuario: {
                rolId,
                usuarioId,
                nombre,
                apellido,
                contrasena,
                editarContrasena
            }
        }

        ApiCalls.httpPost('user/editar-usuario', request);

        onResetForm();
        hideEditPanel();
        cargarData();
    }

    const handleReturn = () => {
        onResetForm();
        hideEditPanel();
    }

    const DrawerList = (
        <Box sx={{
            width: 300, marginTop: '10px', marginLeft: '10px', display: 'grid',
            alignContent: 'space-between', justifyContent: 'space-around',
            height: '100%', marginBottom: '10px'
        }}
            role="presentation"
        >
            <div>
                <h3>Editar Usuario</h3>

                <TextField
                    id="input-with-icon-textfield-usuario"
                    margin="normal"
                    fullWidth
                    label="User Id"
                    value={usuarioId}
                    name="usuarioId"
                    onChange={onInputChange}
                    variant="standard"
                    disabled={true}
                />

                <TextField
                    id="input-with-icon-textfield-nombre"
                    margin="normal"
                    fullWidth
                    label="Nombre"
                    value={nombre}
                    name="nombre"
                    onChange={onInputChange}
                    variant="standard"
                />
                <TextField
                    id="input-with-icon-textfield-apellido"
                    margin="normal"
                    fullWidth
                    label="Apellido"
                    value={apellido}
                    name="apellido"
                    onChange={onInputChange}
                    variant="standard"
                />

                <ToggleSwitchControl
                    checked={editarContrasena}
                    setChecked={setEditarContrasena}
                    labelChecked='Editar Contraseña'
                    labelUnchecked='No Editar Contraseña'
                />

                <TextField
                    id="input-with-icon-textfield-contrasena"
                    margin="normal"
                    fullWidth
                    label="Contraseña"
                    value={contrasena}
                    name="contrasena"
                    onChange={onInputChange}
                    variant="standard"
                    disabled={!editarContrasena}
                />
                <TextField
                    id="input-with-icon-textfield-rolId"
                    margin="normal"
                    fullWidth
                    label="Rol Id"
                    value={rolId}
                    name="rolId"
                    onChange={onInputChange}
                    variant="standard"
                />


            </div>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Tooltip title='Return'>
                    <Fab color="primary" aria-label="add" onClick={handleReturn}>
                        <KeyboardReturnIcon />
                    </Fab>
                </Tooltip>
                <Tooltip title='Save'>
                    <Fab color="primary" aria-label="add" onClick={save}>
                        <SaveIcon />
                    </Fab>
                </Tooltip>
            </Box>
        </Box>
    );

    return (
        <div>
            <Drawer
                open={open}
                anchor='right'
            >
                {DrawerList}
            </Drawer>
        </div>
    )
}

EditarUser.propTypes = {
    open: PropTypes.bool.isRequired,
    hideEditPanel: PropTypes.func.isRequired,
    cargarData: PropTypes.func.isRequired,
    usuarioSeleccionado: PropTypes.object.isRequired
};