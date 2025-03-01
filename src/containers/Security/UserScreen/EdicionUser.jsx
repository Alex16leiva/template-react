import PropTypes from "prop-types";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify";
import { Box, Drawer, Fab, TextField, Tooltip } from "@mui/material"
import { useForm } from '../../../hooks/useForm';
import { ApiCalls } from "../../../Services/ApiCalls";
import { utilsValidator } from "../../../Helpers/utils/utilsValidator";

export const EdicionUser = ({
    open,
    hideAddPanel
}) => {
    const { usuarioId, nombre, apellido, rolId, contrasena, onInputChange, onResetForm } = useForm({
        usuarioId: '', nombre: '', apellido: '', rolId: '', contrasena: ''
    });
    const save = async () => {

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
            rol: {
                rolId,
                usuarioId,
                nombre,
                apellido,
                contrasena
            }
        }

        ApiCalls.httpPost('user/crear-usuario', request);

        onResetForm();
        hideAddPanel();
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
                <h3>Crear Usuario</h3>

                <TextField
                    id="input-with-icon-textfield"
                    margin="normal"
                    fullWidth
                    label="User Id"
                    value={usuarioId}
                    name="userId"
                    onChange={onInputChange}
                    variant="standard"
                />

                <TextField
                    id="input-with-icon-textfield"
                    margin="normal"
                    fullWidth
                    label="Nombre"
                    value={nombre}
                    name="nombre"
                    onChange={onInputChange}
                    variant="standard"
                />
                <TextField
                    id="input-with-icon-textfield"
                    margin="normal"
                    fullWidth
                    label="Apellido"
                    value={apellido}
                    name="apellido"
                    onChange={onInputChange}
                    variant="standard"
                />
                <TextField
                    id="input-with-icon-textfield"
                    margin="normal"
                    fullWidth
                    label="Contraseña"
                    value={contrasena}
                    name="contrasena"
                    onChange={onInputChange}
                    variant="standard"
                />
                <TextField
                    id="input-with-icon-textfield"
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
                    <Fab color="primary" aria-label="add" type="button" onClick={() => hideAddPanel}>
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

EdicionUser.propTypes = {
    open: PropTypes.bool.isRequired,
    hideAddPanel: PropTypes.func.isRequired,
};