import { Component } from '@angular/core';
import { UploadServiceService } from '../service/upload-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-upload-file',
  imports: [NgIf, CommonModule, ButtonModule, CardModule],
  providers:[UploadServiceService],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {

   token: string = "";
  archivoUrl: any;

  constructor(private fileService: UploadServiceService) {}

  login() {
    this.fileService.getToken().subscribe(res => {
      this.token = res.token;
      Swal.fire({
  title: "Satisfactorio",
  text: "Token Obtenido",
  icon: "success"
});
    });
  }

  cargarArchivo() {
    if (!this.token) {
      alert("Primero haz login");
      return;
    }

    this.fileService.getArchivo("reporte1.pdf", this.token).subscribe(archivo => {
      this.archivoUrl = URL.createObjectURL(archivo);
    });
  }
}
