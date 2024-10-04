import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { Tenant } from "../models/tenant";

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private readonly STORAGE_KEY = 'cursos_cart';
  
    // Carga los cursos desde el almacenamiento
    loadTenant(): Observable<Tenant[]> {
      try {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return of(data ? JSON.parse(data) : []);
      } catch (error) {
        return throwError(
          () => new Error('Error al cargar los cursos del almacenamiento.')
        );
      }
    }
  
    // Guarda los cursos en el almacenamiento
    saveTenants(cursos: Tenant[]): void {
      try {
        const data = JSON.stringify(cursos);
        localStorage.setItem(this.STORAGE_KEY, data);
      } catch (error) {
        console.error('Error al guardar los cursos en el almacenamiento:', error);
        // Opcional: podrías implementar una notificación al usuario aquí
      }
    }
  }