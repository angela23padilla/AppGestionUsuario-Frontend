import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonaService } from '../../../services/persona.service';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatOptionModule, 
    MatSelectModule,
    MatCardModule],
  templateUrl: './persona-formulario.component.html',
  styleUrl: './persona-formulario.component.css'
})
export class PersonaFormComponent {
  productForm!: FormGroup;
  isEditMode = false;
  personaId!: number; 

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      email: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required]
    });


    this.route.paramMap.subscribe((params) => {
      this.personaId = Number(params.get('id'));
      if (this.personaId) {
        this.isEditMode = true;
        this.loadProduct(this.personaId);
      }
    });
  }


  loadProduct(id: number): void {
    this.personaService.getPersonaById(id).subscribe((persona) => {
      console.log(persona[0]);
      this.productForm.patchValue(persona[0]);
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.toastr.error('Por favor, completa todos los campos', 'Error');
      return;
    }
      
    const productData = this.productForm.value;

    if (this.isEditMode) {

      this.personaService.updatePersona(this.personaId, productData).subscribe(() => {
        this.toastr.success('Producto actualizado correctamente', '¡Éxito!');
        this.router.navigate(['/products']);
      });
    } else {
      this.personaService.createPersona(productData).subscribe(() => {
        this.toastr.success('Persona registrada correctamente', '¡Éxito!');
        this.router.navigate(['/personas']);
      });
    }
  }


  onCancel(): void {
    this.router.navigate(['/personas']);
  }
}
