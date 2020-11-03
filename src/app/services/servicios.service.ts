import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Servicio } from "../models/servicio";

@Injectable({
  providedIn: "root"
})
export class ServiciosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    // la barra al final del resourse url es importante para los metodos que concatenan el id del recurso (GetById, Put)
    //this.resourceUrl = "https://pavii.ddns.net/api/servicios/";
    this.resourceUrl = "https://bitgocba.duckdns.org/api/servicios/";
  }
  get(
    IdServicio: number,
    Descripcion: string,
    Importe: number,
    Cantidadhoras: number
  ) {
    let param = new HttpParams();
    if (IdServicio != null) {
      param = param.append("IdServicio", IdServicio.toString());
    }
    if (Descripcion != null) {
      param = param.append("Descripcion", Descripcion);
    }
    if (Importe != null) {
      param = param.append("Importe", Importe.toString());
    }
    if (Cantidadhoras != null) {
      param = param.append("Cantidadhoras", Cantidadhoras.toString());
    }
    return this.httpClient.get(this.resourceUrl, { params: param });
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }

  post(obj: Servicio) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(Id: number, obj: Servicio) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

  delete(Id) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }
}