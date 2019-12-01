import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocatePage } from './locate.page';

describe('LocatePage', () => {
  let component: LocatePage;
  let fixture: ComponentFixture<LocatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
