import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Photo } from '../model/photo';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photoUrl = "http://localhost:3000/photos";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private messageService: MessageService) {

  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photoUrl)
      .pipe(
        tap(_ => this.log('fetched img')),
        catchError(this.handleError<Photo[]>('getPhotos', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getPhoto(id: number): Observable<Photo> {
    const url = `${this.photoUrl}/${id}`;
    return this.http.get<Photo>(url).pipe(
      tap(_ => this.log(`fetched Photo id=${id}`)),
      catchError(this.handleError<Photo>(`getPhoto id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addPhoto(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>(this.photoUrl, photo, this.httpOptions).pipe(
      tap((newPhoto: Photo) => this.log(`added photo w/ id=${newPhoto.id}`)),
      catchError(this.handleError<Photo>('addPhoto'))
    );
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PhotoService: ${message}`);
  }

}
