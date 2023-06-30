/* import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class APIServiced {

    constructor(
        private http:HttpClient
    ) {

    }
    getUsers(username:string): Observable<any> {
        return this.http.get(`${this.url}/users/search?1q=${username}`)
    }
} */