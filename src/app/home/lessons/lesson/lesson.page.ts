import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Lesson } from '../../../models/lesson';
import { LessonsService } from '../lessons.service';

@Component({
    selector: 'app-lesson',
    templateUrl: './lesson.page.html',
    styleUrls: ['./lesson.page.scss'],
})
export class LessonPage implements OnInit {
    lesson: Lesson;

    constructor(
        private router: Router,
        private navCtrl: NavController,
        private route: ActivatedRoute,
        private lessonsService: LessonsService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('lessonId')) {
                this.navCtrl.navigateBack('/home/tabs/lessons');
                return;
            }
            this.lesson = this.lessonsService.getLesson(paramMap.get('lessonId'));
            console.log('Lesson: ', this.lesson.name);

        });
    }

    playLesson() {
        this.navCtrl.navigateBack('/home/tabs/lessons');
        // this.router.navigateByUrl('/home/tabs/lessons');
    }

}
