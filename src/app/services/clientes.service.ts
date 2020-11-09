import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Cliente } from "../models/cliente";

@Injectable({
  providedIn: "root"
})
export class ClientesService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    // la barra al final del resourse url es importante para los metodos que concatenan el id del recurso (GetById, Put)
    //this.resourceUrl = "https://pavii.ddns.net/api/articulos/";
    //this.resourceUrl = "https://bitgocba.duckdns.org/api/articulos/";
    this.resourceUrl = "https://demo3151356.mockable.io/clientes";
    //this.resourceUrl="http://localhost:3000/Clientes";
  }

  getBuscar(NumeroDocumento: number, TieneTrabajo: boolean, Pagina: number) {
    let params = new HttpParams();
    if (NumeroDocumento != null) {
      params = params.append("NumeroDocumento", NumeroDocumento.toString());
    }
    if (TieneTrabajo != null) {
      // para evitar error de null.ToString()
      params = params.append("TieneTrabajo", TieneTrabajo.toString());
    }
    params = params.append("Pagina", Pagina.toString());
    return this.httpClient.get(this.resourceUrl, { params: params });
  }
  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }

  post(obj: Cliente) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(Id: number, obj: Cliente) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

  delete(Id) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }
}
