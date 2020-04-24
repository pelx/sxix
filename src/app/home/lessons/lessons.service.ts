import { Injectable } from '@angular/core';
import { Lesson } from '../../models/lesson';

@Injectable({
    providedIn: 'root',
})
export class LessonsService {
    private _lessons: Lesson[] = [
        new Lesson(
            1,
            100,
            'AY Test',
            'Garet',
            'First lesson',
            50,
            'S001',
            2014,
            'url',
            'ATM'
        ),
        new Lesson(
            2,
            101,
            'AY Test',
            'Garet',
            'Second lesson',
            50,
            'S001',
            2014,
            'url',
            'ATM'
        ),
    ];

    get lessons() {
        return [...this._lessons];
    }
    getLesson(lessonId: string) {
        return { ...this._lessons.find(l => l.id.toString() === lessonId) };
    }

    constructor() { }
}
