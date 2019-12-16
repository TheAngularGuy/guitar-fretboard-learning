import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreChordsPage } from './explore-chords.page';

describe('ExploreChordsPage', () => {
  let component: ExploreChordsPage;
  let fixture: ComponentFixture<ExploreChordsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreChordsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreChordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
