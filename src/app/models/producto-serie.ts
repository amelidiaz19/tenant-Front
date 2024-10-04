export interface ProductoSerieRequest {
    id_producto: string,
    id_lote: number,
    sn : string [];
}

export interface ProductoSerieResponse {
    sn: string;
}  