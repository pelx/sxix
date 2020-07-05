import { environment } from './../../environments/environment';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { User } from '../models/user';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {
    private _user = new BehaviorSubject<User>(null);
    private activeTimer: any;
    // private _token = new BehaviorSubject<string>(null);

    constructor(private http: HttpClient) { }

    get userIsAuthenticated() {
        return this._user.asObservable().pipe(
            map((user) => {
                if (user) {
                    return !!user.token; // force convertion to boolean
                } else {
                    return false;
                }
            })
        );
    }

    get userId() {
        return this._user.asObservable().pipe(
            map((user) => {
                if (user) {
                    return user.id;
                } else {
                    return null;
                }
            })
        );
    }

    get user() {
        return this._user.asObservable().pipe(
            map((user) => {
                if (user) {
                    return user;
                } else {
                    return null;
                }
            })
        );
    }

    get token() {
        return this._user.asObservable().pipe(
            map((user) => {
                if (user) {
                    return user.token;
                } else {
                    return null;
                }
            })
        );
    }

    autologin() {
        return from(Plugins.Storage.get({ key: 'authData' })).pipe(
            map((storedData) => {

                if (!storedData || !storedData.value) {
                    return null;
                } else {
                    const parsedData = JSON.parse(storedData.value) as {
                        userId: string;
                        token: string;
                        tokenExpirationDate: string;
                        email: string;
                    };
                    const expirationTime = new Date(parsedData.tokenExpirationDate);
                    if (expirationTime <= new Date()) {
                        return null;
                    }
                    const user = new User(
                        parsedData.userId,
                        parsedData.email,
                        parsedData.token,
                        expirationTime
                    );
                    return user;
                }
            }),
            tap((user) => {
                if (user) {
                    this._user.next(user); // returns user
                    this.autoLogout(user.tokenDuration);
                }
            }),
            map((user) => {
                return !!user; // return boolean
            })
        );
    }

    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
                ${environment.firebaseAPIKey}`,
                // tslint:disable-next-line: object-literal-shorthand
                { email: email, password: password, returnSecureToken: true }
            )
            .pipe(
                tap((userData) => {
                    this.setUserData(userData);
                })
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
            ${environment.firebaseAPIKey}`,
                { email, password, returnSecureToken: true }
                // { email: email, password: password, returnSecureToken: true }
            )
            .pipe(
                tap((userData) => {
                    this.setUserData(userData);
                    // console.log('USER Data: ', userData);
                })
            );
    }

    logout() {
        if (this.activeTimer) {
            clearTimeout(this.activeTimer);
        }

        this._user.next(null);
        Plugins.Storage.remove({ key: 'authData' });
    }

    ngOnDestroy(): void {
        if (this.activeTimer) {
            clearTimeout(this.activeTimer);
        }
    }

    private autoLogout(duration: number) {
        setTimeout(() => {
            if (this.activeTimer) {
                clearTimeout(this.activeTimer);
            }
            this.activeTimer = this.logout();
        }, duration);
    }

    private setUserData(userData: AuthResponseData) {
        const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
        );

        const user = new User(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
        );
        // emit new user
        this._user.next(user);
        // console.log('STORE AUTH:', user);

        // logout if expired
        this.autoLogout(user.tokenDuration);
        // store user in lical storage
        this.storeAauthData(
            userData.localId,
            userData.idToken,
            expirationTime.toISOString(),
            userData.email
        );
    }

    private storeAauthData(
        userId: string,
        token: string,
        tokenExpirationDate: string,
        email: string
    ) {
        const data = JSON.stringify({
            userId,
            token,
            tokenExpirationDate,
            email,
        });
        Plugins.Storage.set({ key: 'authData', value: data });
    }
}
