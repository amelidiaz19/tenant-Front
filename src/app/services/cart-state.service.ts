import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { StorageService } from "./storage.service";
import { Tenant } from "../models/tenant";
import { CartState } from "../models/cart-state";

@Injectable({
    providedIn: 'root',
})
export class CartStateService {
    private _storageService = inject(StorageService);
  
    // BehaviorSubject para mantener el estado del carrito
    private cartState$ = new BehaviorSubject<CartState>({
      tenants: [],
      quantity: 0,
      loaded: false,
    });
  
    // Observable que expone el estado para su suscripción
    state$ = this.cartState$.asObservable();
    cursos$ = this.state$.pipe(map((state) => state.tenants));
    quantity$ = this.state$.pipe(map((state) => state.quantity));
    constructor() {
      // Cargar cursos desde el localStorage al inicializar el servicio
      this.loadCursos();
    }
  
    // Método para agregar un curso al carrito
    addCurso(newTenat: Tenant): boolean {
      const currentState = this.cartState$.getValue();
  
      // Comprobar si el curso ya existe
      if (!currentState.tenants.some((tenant) => tenant.id === newTenat.id)) {
        const updatedCursos = [...currentState.tenants, newTenat];
  
        // Actualizar el estado del carrito
        const updatedState: CartState = {
          ...currentState,
          tenants: updatedCursos,
          quantity: currentState.quantity + 1,
        };
  
        // Emitir el nuevo estado
        this.cartState$.next(updatedState);
  
        // Guardar en localStorage
        this._storageService.saveTenants(updatedCursos);
  
        return true; // Se agregó correctamente
      }
  
      return false; // Ya existía en el carrito
    }
  
    // Método para eliminar un tenant del carrito
    removeCurso(id: string) {
      const currentState = this.cartState$.getValue();
      const updatedTenants = currentState.tenants.filter(
        (tenant) => tenant.id !== id
      );
  
      const updatedState: CartState = {
        ...currentState,
        tenants: updatedTenants,
        quantity: currentState.quantity - 1,
      };
  
      this.cartState$.next(updatedState);
      this._storageService.saveTenants(updatedTenants);
    }
  
    // Cargar los cursos guardados en localStorage
    private loadCursos() {
      this._storageService.loadTenant().subscribe((tenants: Tenant[]) => {
        const currentState = this.cartState$.getValue();
  
        // Emitir el estado actualizado con los cursos cargados
        this.cartState$.next({
          ...currentState,
          tenants,
          quantity: tenants.length,
          loaded: true,
        });
      });
    }
  }