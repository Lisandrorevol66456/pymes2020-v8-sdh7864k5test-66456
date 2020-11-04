import { Component, OnInit } from "@angular/core";
import { Servicio } from "../../models/Servicio";
import { ServiciosService } from "../../services/servicios.service";
@Component({
  selector: "app-servicios",
  templateUrl: "./servicios.component.html",
  styleUrls: ["./servicios.component.css"]
})
export class ServiciosComponent implements OnInit {
  servicios: any = [];

  constructor(private serviciosServices: ServiciosService) {}

  ngOnInit() {
    this.GetServicios();
  }
  GetServicios() {
    this.serviciosServices.get().subscribe(data => (this.servicios = data));
  }
}

// constructor(
//     //private articulosFamiliasService:  ArticulosFamiliasService
//     private articulosFamiliasService:  MockArticulosFamiliasService
//   ){}

//   ngOnInit() {
//     this.GetFamiliasArticulos();
//   }

//   GetFamiliasArticulos() {
//     this.articulosFamiliasService.get()
//     .subscribe((res:ArticuloFamilia[]) => {
//       this.Items = res;
//     });
//   }
