import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "https://api.thingspeak.com/channels/812504/feeds.json?api_key=0XMWXHMWLCH8NRDL&results=1";


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

	constructor(private http: HttpClient) { }
  
  
	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
		} else {
			console.error('Código de error: ${error.status}, ' + 'Mensaje: ${error.error}');
		}
		return throwError('No se ha podido traer los datos');
	}

	private extractData(res: Response) {
		let body = res;
		return body || { };
	}
	
	obtenerDatosSensor(): Observable<any> {
		return this.http.get(apiUrl, httpOptions).pipe(
		map(this.extractData),
		catchError(this.handleError));
	}
}
