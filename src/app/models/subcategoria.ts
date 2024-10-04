export interface SubCategoriaRequest {
    nombre: string;
    descripcion: string;
    id_categoria: number;
}

export interface SubCategoriaResponse {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
}