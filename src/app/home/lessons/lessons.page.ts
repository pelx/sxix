import { Component, OnInit, OnDestroy } from '@angular/core';
import { LessonsService } from './lessons.service';
import { Lesson } from '../../models/lesson';
// import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-lessons',
    templateUrl: './lessons.page.html',
    styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit, OnDestroy {
    lessons: Lesson[];
    relevantLessons: Lesson[];
    private lessonsSub: Subscription;
    private filter = 'all';
    isLoading = false;

    constructor(
        private lessonsService: LessonsService,
        private router: Router // private actionSheet: ActionSheetController
    ) { }

    ngOnInit() {
        this.lessonsSub = this.lessonsService.lessons.subscribe((lessons) => {
            this.lessons = lessons;
            this.onFilterUpdate(this.filter);
            this.relevantLessons = this.lessons;
        });
    }

    ionViewWillEnter() {
        this.isLoading = true;
        this.lessonsService.fetchLessons().subscribe(
            (lessons) => {
                this.isLoading = false;
            }
        );
    }

    onFilterUpdate(filter: string) {
        if (filter === 'all') {
            this.relevantLessons = this.lessons;

        } else if (filter === 'atm') {
            this.relevantLessons = this.lessons.filter(lesson => lesson.type === 'ATM');
        }
        this.filter = filter;
    }

    onClick(id: string) {
        this.router.navigate(['/', 'home', 'tabs', 'lessons', id]);
    }

    ngOnDestroy(): void {
        if (this.lessonsSub) {
            this.lessonsSub.unsubscribe();
        }
    }
}
