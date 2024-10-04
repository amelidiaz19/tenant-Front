import { SubCategoriaResponse } from "./subcategoria";

export interface CategoriaRequest {
    nombre: string;
    descripcion: string;
}

export interface CategoriaResponse {
    id: number;
    nombre: string;
    descripcion: string;
    subcategorias: SubCategoriaResponse[];
}