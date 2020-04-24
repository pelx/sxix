import { Component, OnInit } from '@angular/core';
import { LessonsService } from './lessons.service';
import { Lesson } from '../../models/lesson';

@Component({
    selector: 'app-lessons',
    templateUrl: './lessons.page.html',
    styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {
    lessons: Lesson[];
    constructor(private lessonsService: LessonsService) { }

    ngOnInit() {
        this.lessons = this.lessonsService.lessons;
        // console.log('Lessons: ', this.lessons);
    }
}
