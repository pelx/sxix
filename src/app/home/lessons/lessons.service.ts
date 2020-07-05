import { Injectable } from '@angular/core';
import { Lesson } from '../../models/lesson';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

export interface LessonData {
    duration: string;
    name: string;
    segment: string;
    tag: string[];
    teacher: string;
    topic: string;
    track: number;
    type: string;
    url: string;
    year: number;
}

@Injectable({
    providedIn: 'root',
})
export class LessonsService {
    private _lessons = new BehaviorSubject<Lesson[]>([]);

    private lessonsUrl = 'https://sussexix.firebaseio.com/lessons';

    // private _lessons: Lesson[] = [
    // [] > ([
    //   new Lesson(
    //     '1',
    //     100,
    //     'AY Test',
    //     'Garet',
    //     'First lesson',
    //     '00:45:12',
    //     'S001',
    //     2014,
    //     'url',
    //     'ATM',
    //     ['LOB']
    //   ),
    //   new Lesson(
    //     '2',
    //     101,
    //     'AY Test',
    //     'Garet',
    //     'Second lesson',
    //     '00:50:09',
    //     'S001',
    //     2014,
    //     'url',
    //     'FI',
    //     ['LOF']
    //   ),
    // ]);

    constructor(private http: HttpClient, private authService: AuthService) { }

    get lessons() {
        return this._lessons.asObservable();
    }

    addLesson(
        track: number,
        name: string,
        teacher: string,
        topic: string,
        duration: string,
        segment: string,
        year: number,
        url: string,
        type: string,
        tag: string[]
    ) {
        let generatedId: string;
        const newLesson = new Lesson(
            Math.random().toLocaleString(),
            track,
            name,
            teacher,
            topic,
            duration,
            segment,
            year,
            url,
            type,
            tag
        );
        return this.http
            .post<{ name: string }>(`${this.lessonsUrl}.json`, {
                ...newLesson,
                id: null,
            })
            .pipe(
                switchMap((res) => {
                    generatedId = res.name;
                    return this.lessons;
                }),
                take(1),
                tap((lessons) => {
                    newLesson.id = generatedId;
                    this._lessons.next(lessons.concat(newLesson));
                })
            );
    }

    getLesson(lessonId: string) {
        return this.lessons.pipe(
            take(1),
            map((lessons) => {
                return {
                    ...lessons.find((lesson) => lesson.id.toString() === lessonId),
                };
            })
        );

        // return { ...this._lessons.find(l => l.id.toString() === lessonId) };
    }

    fetchLessons() {
        return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
                // GET
                return this.http.get<{ [key: string]: LessonData }>(
                    `${this.lessonsUrl}.json?auth=${token}`
                );
            }),
            map((lessonsData) => {
                const lessons = [];
                for (const key in lessonsData) {
                    if (lessonsData.hasOwnProperty(key)) {
                        lessons.push(
                            new Lesson(
                                key,
                                lessonsData[key].track,
                                lessonsData[key].name,
                                lessonsData[key].teacher,
                                lessonsData[key].topic,
                                lessonsData[key].duration,
                                lessonsData[key].segment,
                                lessonsData[key].year,
                                lessonsData[key].url,
                                lessonsData[key].type,
                                lessonsData[key].tag
                            )
                        );
                    }
                }
                // return [];
                return lessons;
            }),
            tap((lessons) => {
                this._lessons.next(lessons);
            })
        );
    }

}
