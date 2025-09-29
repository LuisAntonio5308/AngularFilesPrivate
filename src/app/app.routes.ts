import { Routes } from '@angular/router';
import { UploadFileComponent } from './uploadFile/upload-file/upload-file.component';

export const routes: Routes = [
    { path: '', component: UploadFileComponent },       // ruta rat
  { path: '**', redirectTo: '' }  
];
