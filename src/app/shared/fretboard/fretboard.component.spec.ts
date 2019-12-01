import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FretboardComponent } from './fretboard.component';

describe('FretboardComponent', () => {
  let component: FretboardComponent;
  let fixture: ComponentFixture<FretboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FretboardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
