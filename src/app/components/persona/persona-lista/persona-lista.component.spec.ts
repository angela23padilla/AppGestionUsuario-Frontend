import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaListaComponent } from './persona-lista.component';

describe('PersonaListaComponent', () => {
  let component: PersonaListaComponent;
  let fixture: ComponentFixture<PersonaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
