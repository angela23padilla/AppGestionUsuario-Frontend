import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';



export interface Persona {
  id: number;
  nombres: string;
  apellidos: string;
  numeroIdentificacion: string;
  email: string;
  Tipoidentifiacion: string;
}

export interface PaginatedResponse {
  items: Persona[];
  totalRecords: number;
}
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiUrl = 'https://localhost:44395/api/Persona';
  constructor(private http: HttpClient) {}

  
  getPersonas(
    page: number,
    pageSize: number,
    search: string = ''
  ): Observable<PaginatedResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('Error al obtener personas:', error);
        throw error;
      })
    );
  }

  createPersona(person: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, person);
  }


  updatePersona(id: number, person: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, person);
  }


  deletePersona(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getPersonaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
