import { Injectable } from '@angular/core';
import { Note } from 'src/app/models/note';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';

export interface NoteData {
    createdOn: string;
    lessonId: string;
    lessonTitle: string;
    note: string;
    updatedOn: string;
    userId: string;
}

@Injectable({
    providedIn: 'root',
})
export class NotesService {
    private notesUrl = 'https://sussexix.firebaseio.com/notes';
    private _notes = new BehaviorSubject<Note[]>([]);
    //     ([
    //     new Note(
    //         '1',
    //         '100',
    //         'AY Test',
    //         'Garet First lesson',
    //         new Date('01/01/2020'),
    //         new Date('01/01/2020'),
    //         'laura'
    //     ),

    // ]);

    constructor(private authService: AuthService, private http: HttpClient) { }

    get notes() {
        return this._notes.asObservable();
        // return [...this._notes];
    }

    fetchNotes() {
        let userId: string;
        let token: string;
        return this.authService.user.pipe(
            take(1),
            switchMap((user) => {
                if (!user) {
                    throw new Error('No user found!');
                }
                userId = user.id;
                token = user.token;
                return this.http.get<{ [key: string]: NoteData }>(
                    `${this.notesUrl}.json?auth=${token}&&orderBy="userId"&&equalTo="${userId}"`
                );
            }),
            map((res) => {
                console.log('GET RESULT:', res);

                const notes = [];
                for (const key in res) {
                    if (res.hasOwnProperty(key)) {
                        notes.push(
                            new Note(
                                key,
                                res[key].lessonId,
                                res[key].lessonTitle,
                                res[key].note,
                                new Date(res[key].createdOn),
                                new Date(res[key].updatedOn),
                                res[key].userId
                            )
                        );
                    }
                }
                return notes;
            }),
            tap((notes) => {
                this._notes.next(notes);
            })
        );
    }

    getNote(noteId: string) {
        return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
                return this.http.get<NoteData>(
                    `${this.notesUrl}/${noteId}.json?auth=${token}`
                );
            }),
            map((resNote) => {
                console.log(resNote);
                return new Note(
                    noteId,
                    resNote.lessonId,
                    resNote.lessonTitle,
                    resNote.note,
                    new Date(resNote.createdOn),
                    new Date(resNote.updatedOn),
                    resNote.userId
                );
            })
        );
    }

    addNote(lessonId: string, lessonTitle: string, note: string) {
        let generatedId: string;
        let newNote: Note;
        let fetchedUser;
        return this.authService.userId.pipe(
            take(1),
            switchMap((userId) => {
                if (!userId) {
                    throw new Error('No user id found!');
                }
                fetchedUser = userId;
                return this.authService.token;
            }),
            take(1),
            switchMap((token) => {
                newNote = new Note(
                    Math.random().toString(),
                    lessonId,
                    lessonTitle,
                    note,
                    new Date(),
                    new Date(),
                    fetchedUser
                );

                return this.http.post<{ name: string }>(
                    `${this.notesUrl}.json?auth=${token}`,
                    {
                        ...newNote,
                        noteId: null,
                    }
                );
            }),
            switchMap((resData) => {
                generatedId = resData.name;
                return this.notes;
            }),
            take(1),
            tap((notes) => {
                newNote.noteId = generatedId;
                this._notes.next(notes.concat(newNote));
            })
        );
    }

    updateNote(noteId: string, note: string) {
        let updatedNotes: Note[];
        let fetchedToken;
        return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
                fetchedToken = token;
                return this.notes;
            }),
            take(1),
            switchMap((notes) => {
                // ensure notes were fetched
                if (!notes || notes.length <= 0) {
                    return this.fetchNotes();
                } else {
                    return of(notes);
                }
            }),
            switchMap((notes) => {
                const updatedNoteIndex = notes.findIndex((n) => n.noteId === noteId);
                updatedNotes = [...notes];
                const oldNote = updatedNotes[updatedNoteIndex];
                updatedNotes[updatedNoteIndex] = new Note(
                    oldNote.lessonId,
                    oldNote.lessonTitle,
                    note,
                    oldNote.noteId,
                    oldNote.createdOn,
                    new Date(),
                    oldNote.userId
                );
                return this.http.put<NoteData>(
                    `${this.notesUrl}/${noteId}.json?auth=${fetchedToken}`,
                    {
                        ...updatedNotes[updatedNoteIndex],
                        noteId: null,
                    }
                );
            }),
            tap((res) => {
                this._notes.next(updatedNotes);
            })
        );
    }

    deleteNote(noteId: string) {
        return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
                return this.http.delete(
                    `${this.notesUrl}/${noteId}.json?auth=${token}`
                );
            }),
            switchMap(() => {
                return this.notes;
            }),
            take(1),
            tap((notes) => {
                this._notes.next(notes.filter((note) => note.noteId !== noteId));
            })
        );
    }
}
