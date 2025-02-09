import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Persona, PersonaService } from '../../../services/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { PersonaDetalleComponent } from '../persona-detalle/persona-detalle.component';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './persona-lista.component.html',
  styleUrl: './persona-lista.component.css'
})
export class PersonaListaComponent implements OnInit {
  personas: Persona[] = [];
  displayedColumns: string[] = ['Id', 'nombres', 'apellidos', 'numeroIdentificacion', 'email', 'TipoIdentificacion'];
  searchTerm: string = '';
  totalCount = 0;

  currentPage = 1;
  pageSize = 5;

  constructor(
    private personaService: PersonaService, private dialog: MatDialog, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchPersonas();
  }

  fetchPersonas(): void {
    this.personaService
      .getPersonas(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response) => {
          this.personas = response.items;
          this.totalCount = response.totalRecords;
        },
        error: (error) => {
          console.error('Error al cargar las personas:', error);
        },
      });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.fetchPersonas();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchPersonas();
  }

  editPersona(person: any): void {
    console.log(person);

    if (person?.id) {
      this.router.navigate(['/personas/edit', person.id]);
    } else {
      console.error('Error: la persona no tiene ID');
    }
  }

  deletePersona(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Persona',
        message: '¿Estás seguro de que quieres eliminar esta persona?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Llamamos al servicio para eliminar el producto
        this.personaService.deletePersona(id).subscribe({
          next: () => {
            // Muestra el mensaje de éxito
            this.toastr.success('Persona eliminada', '¡Eliminada!');

            // Actualiza la lista de productos localmente
            this.personas = this.personas.filter(personas => personas.id !== id);
          },
          error: () => {
            this.toastr.error('Error al eliminar el producto', 'Error');
          },
        });
      }
    });
  }

  viewDetails(person: any): void {

    this.dialog.open(PersonaDetalleComponent, {
      data: person,
      width: '750px',
    });
  }
}
