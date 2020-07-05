import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../notes.service';
import { Lesson } from '../../../models/lesson';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
    selector: 'app-create-note',
    templateUrl: './create-note.component.html',
    styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {
    @Input() selectedLesson: Lesson;
    createdOn: string;
    @ViewChild('f') form: NgForm;

    constructor(
        private notesService: NotesService,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController
        // private router: Router
    ) { }

    ngOnInit() {
        this.createdOn = new Date().toLocaleDateString();
        console.log(this.selectedLesson.name);
    }

    onCancel() {
        this.modalCtrl.dismiss(null, 'cancel');

    }

    onCreateNote() {
        console.log('Create note', this.form.value);
        if (!this.form.valid) {
            return;
        }
        this.loadingCtrl.create({
            message: 'Creating Note...'
        }).then(loadingEl => {
            loadingEl.present();
            this.notesService.addNote(
                this.selectedLesson.name,
                this.selectedLesson.topic,
                this.form.value.note)
                .subscribe(() => {
                    loadingEl.dismiss();
                });
        });

        // this.form.reset();
        // this.router.navigateByUrl('/home/tabs/lessons');
    }

}
