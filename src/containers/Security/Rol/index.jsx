import { useState } from "react";
import { SearchModalControl } from "../../../components/Controls/SearchModalControl";


export const Rol = () => {

    const columns = [
        { field: "rolId", headerName: "RolId", width: 100 },
        { field: "descripcion", headerName: "descripcion", width: 200 },
    ];

    const [searchValue, setSearchValue] = useState('');
    return (
        <>
            {searchValue}
            <SearchModalControl
                columns={columns}
                textSearch={'descripcion'}
                setSearchValue={setSearchValue}
                llavePrimaria={'rolId'}
                url={'user/obtener-roles'}
            />
        </>
    );
};
