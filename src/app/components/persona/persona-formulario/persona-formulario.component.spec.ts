import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaFormularioComponent } from './persona-formulario.component';

describe('PersonaFormularioComponent', () => {
  let component: PersonaFormularioComponent;
  let fixture: ComponentFixture<PersonaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
