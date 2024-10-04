import { CategoriaMarcaResponse } from "./categoria-marca";

export interface MarcaRequest {
    nombre: string;
}

export interface MarcaResponse {
    id: number;
    nombre: string;
    categorias: CategoriaMarcaResponse[];
}