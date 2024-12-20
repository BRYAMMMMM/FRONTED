import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  archivo: File | null = null;

  constructor(private usuarioService: UsuarioService) {}

  // Manejar selección de archivo
  onFileSelected(event: any): void {
    this.archivo = event.target.files[0];
  }

  // Crear usuario
  createUsuario(): void {
    if (this.archivo && this.nombre && this.apellido && this.direccion) {
      const formData = new FormData();
      formData.append('file', this.archivo);
      formData.append('nombre', this.nombre);
      formData.append('apellido', this.apellido);
      formData.append('direccion', this.direccion);

      this.usuarioService.createUsuario(formData).subscribe({
        next: (res) => {
          alert('Usuario creado con éxito');
          console.log(res);
        },
        error: (err) => {
          console.error(err);
          alert('Error al crear el usuario');
        },
      });
    } else {
      alert('Todos los campos son obligatorios');
    }
  }

  // Descargar archivo asociado a un usuario
  downloadFile(userId: string): void {
    const userIdNumber = Number(userId);
    if (!isNaN(userIdNumber)) {
      this.usuarioService.downloadFile(userIdNumber).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'archivo_usuario';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error(err);
          alert('Error al descargar el archivo');
        },
      });
    } else {
      alert('ID de usuario no válido');
    }
  }
  
}

