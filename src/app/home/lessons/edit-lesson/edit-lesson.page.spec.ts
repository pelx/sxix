import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditLessonPage } from './edit-lesson.page';

describe('EditLessonPage', () => {
  let component: EditLessonPage;
  let fixture: ComponentFixture<EditLessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditLessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
