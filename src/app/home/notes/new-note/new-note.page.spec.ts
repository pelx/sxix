import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewNotePage } from './new-note.page';

describe('NewNotePage', () => {
  let component: NewNotePage;
  let fixture: ComponentFixture<NewNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
