import { CreateNoteComponent } from './../../notes/create-note/create-note.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { Lesson } from '../../../models/lesson';
import { LessonsService } from '../lessons.service';
import { PlayerComponent } from '../../../player/player.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-lesson',
    templateUrl: './lesson.page.html',
    styleUrls: ['./lesson.page.scss'],
})
export class LessonPage implements OnInit, OnDestroy {
    lesson: Lesson;
    lessonSub: Subscription;

    constructor(
        // private router: Router,
        private navCtrl: NavController,
        private route: ActivatedRoute,
        private lessonsService: LessonsService,
        private modalCtrl: ModalController
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('lessonId')) {
                this.navCtrl.navigateBack('/home/tabs/lessons');
                return;
            }

            this.lessonSub = this.lessonsService
                .getLesson(paramMap
                    .get('lessonId'))
                .subscribe(lesson => {
                    this.lesson = lesson;
                    console.log('SELECTED LESSON:', this.lesson);
                });
            // this.lesson = this.lessonsService.getLesson(paramMap.get('lessonId'));
        });
    }

    playLesson() {
        this.modalCtrl
            .create({
                component: PlayerComponent,
                componentProps: { selectedLesson: this.lesson },
            })
            .then((modalEl) => {
                modalEl.present();
                return modalEl.onDidDismiss();
            })
            .then((res) => {
                console.log(res.data, res.role);
                if (res.role === 'save') {
                    console.log('SAVE');
                }
            });
    }

    makeNote() {
        this.modalCtrl
            .create({
                component: CreateNoteComponent,
                componentProps: { selectedLesson: this.lesson },
            })
            .then((modalEl) => {
                modalEl.present();
                return modalEl.onDidDismiss();
            })
            .then((res) => {
                console.log(res.data, res.role);
                if (res.role === 'save') {
                    console.log('SAVE');
                }
            });
    }

    ngOnDestroy(): void {
        if (this.lessonSub) {
            this.lessonSub.unsubscribe();
        }
    }

}
