import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Lesson } from 'src/app/models/lesson';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LessonsService } from '../lessons.service';
import { FnParam } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-edit-lesson',
    templateUrl: './edit-lesson.page.html',
    styleUrls: ['./edit-lesson.page.scss'],
})
export class EditLessonPage implements OnInit, OnDestroy {
    form: FormGroup;
    lesson: Lesson;
    lessonSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private lessonService: LessonsService) { }

    ngOnInit() {
        this.route.paramMap.subscribe(parm => {
            if (!parm.has('lessonId')) {
                this.navCtrl.navigateBack('home/tabs/lessons');
            }
            // this.lesson = this.lessonService.getLesson(parm.get('lessonId'));
            this.lessonSub = this.lessonService.getLesson(parm.get('lessonId')).subscribe(lesson => {
                this.lesson = lesson;
                console.log('SELECTED LESSON:', this.lesson);
            });

            this.form = new FormGroup({
                name: new FormControl(this.lesson.name),
                topic: new FormControl(this.lesson.topic),
                type: new FormControl(this.lesson.type, {
                    updateOn: 'blur',
                    validators: [
                        Validators.required]
                }),
                tag: new FormControl(this.lesson.tag, {
                    updateOn: 'blur',
                    validators: [
                        Validators.required,
                        Validators.maxLength(180)]
                })
            });

        });
    }

    onEdit() {
        if (!this.form.valid) {
            return;
        }
        console.log(this.form);
    }

    ngOnDestroy(): void {
        if (this.lessonSub) {
            this.lessonSub.unsubscribe();
        }
    }

}
