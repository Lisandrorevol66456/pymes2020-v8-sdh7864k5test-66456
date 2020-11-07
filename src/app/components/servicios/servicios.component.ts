import { Component, OnInit } from "@angular/core";
import { Servicio } from "../../models/Servicio";
import { ServiciosService } from "../../services/servicios.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";


@Component({
  selector: "app-servicios",
  templateUrl: "./servicios.component.html",
  styleUrls: ["./servicios.component.css"]
})
export class ServiciosComponent implements OnInit {
  Titulo = "Servicios";
  Servicios: any = [];
  Lista: Servicio[] = [];
  TituloAccionABMC = {
    A: "(Agregar servicio)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado de servicios)"
  };
  AccionABMC = "L"; // inicialmente inicia en el listado de articulos (buscar con parametros)
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };

  FormReg: FormGroup;
  submitted = false;

  constructor(
    private serviciosServices: ServiciosService,
    public formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormReg = this.formBuilder.group({
      Idservicio: [0],
      Descripcion: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(55)]],
      Importe: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      Cantidadhoras: [null,[Validators.required, Validators.pattern("[0-9]{1,7}")]]
    });
    this.GetServicios();
  }
  GetServicios() {
    this.serviciosServices.get().subscribe(data => (this.Servicios = data));
  }
  Agregar() {
    this.AccionABMC = "A";
    this.FormReg.reset();
    this.submitted = false;
    //this.FormReg.markAsPristine();
   this.FormReg.markAsUntouched();
  }
  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormReg.invalid) {
      return;
    } // agregar post
    const itemCopy = { ...this.FormReg.value };
    if (itemCopy.Idservicio == 0 || itemCopy.Idservicio == null) {
      itemCopy.Idservicio = 0;
      this.serviciosServices.post(itemCopy).subscribe((res: any) => {
        this.Cancelar();
        this.modalDialogService.Alert("Registro agregado correctamente.");
      });
    } else {
      // modificar put
      this.serviciosServices
        .put(itemCopy.Idservicio, itemCopy)
        .subscribe((res: any) => {
          this.Cancelar();
          this.modalDialogService.Alert("Registro modificado correctamente.");
        });
    }

    this.modalDialogService.Alert("Registro modificado correctamente.");
    this.AccionABMC = "L";
  }
  Cancelar() {
    //this.modalDialogService.Alert("Seguro que desea cancelar?");
    this.AccionABMC = "L";
  }
}
