import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from 'src/app/models/note';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.page.html',
    styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

    constructor(private notesService: NotesService) { }
    notes: Note[];

    ngOnInit() {
        this.notes = this.notesService.notes;
    }

}
