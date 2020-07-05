import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from 'src/app/models/note';
import { ModalController, IonItemSliding } from '@ionic/angular';
import { CreateNoteComponent } from './create-note/create-note.component';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit, OnDestroy {
  notes: Note[];
  selectedNote: Note;
  private notesSub: Subscription;
  private noteSub: Subscription;
  isLoading = false;

  constructor(
    private notesService: NotesService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    // this.notes = this.notesService.notes;
    this.noteSub = this.notesService.notes.subscribe((notes) => {
      this.notes = notes;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.notesService.fetchNotes().subscribe((notes) => {
      console.log('NOTES: ', this.notes);
      this.notes = notes;
      this.isLoading = false;
    });
  }

  createNote() {
    this.modalCtrl
      .create({
        component: CreateNoteComponent,
        componentProps: { selectedNote: this.selectedNote },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  onEdit(id: string, slidingItem: IonItemSliding) {
    this.noteSub = this.notesService.getNote(id).subscribe((note) => {
      this.selectedNote = note;
    });

    slidingItem.close();
    this.router.navigate(['/', 'home', 'tabs', 'notes', 'edit', id]);
  }

  onDelete(id: string, slidingItem: IonItemSliding) {
    this.isLoading = true;
    this.notesService.deleteNote(id).subscribe((notes) => {
      this.isLoading = false;
    });
    slidingItem.close();
  }

  ngOnDestroy(): void {
    if (this.notesSub) {
      this.notesSub.unsubscribe();
    }
    if (this.noteSub) {
      this.noteSub.unsubscribe();
    }
  }
}
