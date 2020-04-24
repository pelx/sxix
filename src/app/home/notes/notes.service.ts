import { Injectable } from '@angular/core';
import { Note } from 'src/app/models/note';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    private _notes: Note[] = [
        new Note(
            1,
            '100',
            'AY Test',
            'Garet First lesson',
            new Date('01/01/2020'),
            new Date('01/01/2020'),
            'laura',
        ),

        new Note(
            2,
            '100',
            'AY Test2',
            'Garet second lesson',
            new Date('01/01/2020'),
            new Date('01/01/2020'),
            'laura',
        ),

    ];

    get notes() {
        return [...this._notes];
    }
    constructor() { }
}
