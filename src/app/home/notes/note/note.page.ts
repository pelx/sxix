import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from '../../../models/note';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NotesService } from '../notes.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-note',
    templateUrl: './note.page.html',
    styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit, OnDestroy {
    note: Note;
    private noteSub: Subscription;
    isLoading = false;

    constructor(
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private notesService: NotesService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((param) => {
            if (!param.has('noteId')) {
                this.navCtrl.navigateBack('/home/tabs/notes');
                return;
            }
            this.isLoading = true;

            const id = param.get('noteId');
            // console.log('NOTEID: ', id);
            // this.note = this.notesService.getNote(parseInt(id, 10));
            this.noteSub = this.notesService.getNote(id).subscribe(note => {
                this.note = note;
                console.log('SELECTED NOTE:', note);
            });
            this.isLoading = false;

        });
    }

    ngOnDestroy(): void {
        if (this.noteSub) {
            this.noteSub.unsubscribe();
        }
    }

}
