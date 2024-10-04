import { PrivilegioResponse } from "./privilegio";

export interface RolResponse {
    id: string;
    nombre: string;
    descripcion: string;
    privilegios: PrivilegioResponse[];
}