import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesPageRoutingModule } from './notes-routing.module';

import { NotesPage } from './notes.page';
import { CreateNoteComponent } from './create-note/create-note.component';
import { NoteItemComponent } from './note-item/note-item.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NotesPageRoutingModule],
  declarations: [NotesPage, CreateNoteComponent, NoteItemComponent],
  entryComponents: [CreateNoteComponent],
})
export class NotesPageModule {}
