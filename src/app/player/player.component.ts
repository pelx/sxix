import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from '../models/lesson';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() selectedLesson: Lesson;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onSave() {
    this.modalCtrl.dismiss({ message: 'Dummy' }, 'save');
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
