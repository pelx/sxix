import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonPageRoutingModule } from './lesson-routing.module';

import { LessonPage } from './lesson.page';
import { PlayerComponent } from '../../../player/player.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LessonPageRoutingModule],
  declarations: [LessonPage, PlayerComponent],
})
export class LessonPageModule {}
