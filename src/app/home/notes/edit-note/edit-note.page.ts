import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Note } from 'src/app/models/note';
import { NotesService } from '../notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-edit-note',
    templateUrl: './edit-note.page.html',
    styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {
    note: Note;
    private noteSub: Subscription;
    @ViewChild('f') form: NgForm;
    // form: FormGroup;
    isLoading = false;

    constructor(
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private notesService: NotesService,
        private router: Router,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((param) => {
            if (!param.has('noteId')) {
                this.navCtrl.navigateBack('/home/tabs/notes');
                return;
            }

            this.isLoading = true;
            const id = param.get('noteId');
            // this.note = this.notesService.getNote(parseInt(id, 10));
            this.noteSub = this.notesService
                .getNote(id)
                .subscribe(note => {
                    console.log('EDIT NOTE:', note);
                    this.note = note;
                    this.isLoading = false;

                    // this.form = new FormGroup({
                    //     lessonId: new FormControl(this.note.lessonId),
                    //     title: new FormControl(this.note.lessonTitle),
                    //     note: new FormControl(this.note.note)
                    // });
                }, error => {
                    this.alertCtrl.create({
                        header: 'An error occured!',
                        message: 'Note could not be fetched. Please try again.',
                        buttons: [{
                            text: 'Okay', handler: () => {
                                this.router.navigate(['/home/tabs/notes']);
                            }
                        }]
                    })
                        .then(alertEl => alertEl.present());
                });
        });
    }

    onUpdateNote() {
        console.log('Create note', this.form.value);
        if (!this.form.valid) {
            return;
        }
        this.loadingCtrl.create({
            message: 'Updating Note...'
        }).then(loadingEl => {
            loadingEl.present();
            this.notesService.updateNote(
                this.note.noteId,
                this.form.value.note)
                .subscribe(() => {
                    loadingEl.dismiss();
                    this.form.reset();
                    this.router.navigateByUrl('/home/tabs/notes');

                });
        });

    }

    // ngOnDestroy(): void {
    //     if (this.noteSub) {
    //         this.noteSub.unsubscribe();
    //     }
    // }

}
