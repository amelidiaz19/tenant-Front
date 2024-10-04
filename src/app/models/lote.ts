export interface LoteRequest{
    id_producto: string;
    nombre: string;
    fecha?: string; 
}

export interface LoteResponse{
    id: number;
    nombre: string;
    fecha?: string; 
}