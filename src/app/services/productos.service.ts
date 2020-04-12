import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtrando = true;

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {
      // Obtenemos los productos desde Firebase
      this.http.get('https://portafolio-html-8dff3.firebaseio.com/productos-idx.json')
      .subscribe( (resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });

   }

   getProducto(id: string) {
     return this.http.get(`https://portafolio-html-8dff3.firebaseio.com/productos/${id}.json`);
   }

   buscarProducto(termino: string) {
    this.filtrando = true;
    if (this.productos.length === 0) {
      // Cargar productos
      this.cargarProductos().then( () => {
        // Ejecutar despues de tener los prods
        this.filtrarProductos(termino);
      });
    } else {
      // Si ya tengo datos, los filtro
      this.filtrarProductos(termino);
    }
   }

   private filtrarProductos(termino: string) {
    this.productosFiltrados = []; // Reseteo los filtrados
    // Para que no sea sensible a mayusculas
    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      const categoriaLower = prod.categoria.toLocaleLowerCase();

      // Filtro por coincidencias en titulo o categoria
      if (categoriaLower.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrados.push(prod);
      }
    });
    this.filtrando = false;
   }
}
