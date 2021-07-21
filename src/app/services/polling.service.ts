import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollingService {

  constructor(private http: HttpClient) { }

  consumo(): Observable<any> {
    return this.http.post('http://localhost:3000/polling', {email: "andresaraque@ajshd.com"})
    .pipe(tap( resp => console.log(resp.status)
    ))
  }
}

