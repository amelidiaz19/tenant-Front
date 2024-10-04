export interface CategoriaMarcaRequest {
    nombre: string;
    id_marca: number;
}

export interface CategoriaMarcaResponse {
    id: number;
    nombre: string;
    marca: string;
}