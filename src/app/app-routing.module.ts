import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { ItemComponent } from './pages/item/item.component';
import { AboutComponent } from './pages/about/about.component';
import { SearchComponent } from './pages/search/search.component';


const routes: Routes = [
  { path: 'home', component: PortafolioComponent },
  { path: 'about', component: AboutComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'search/:termino', component: SearchComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' } //cualquier otra ruta, redirige al portafolio.
];

@NgModule({
  imports: [RouterModule.forRoot( routes, { useHash: true } )], 
  //useHash necesario cuando se va a implementar en servidores donde no podemos modificar el htaccess como GitHubPages
  // (Agrega un # en la ruta, para que los navegadores sepan que es una ruta y no busquen los directorios como carpetas 
  // dentro de nuestra app)
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
