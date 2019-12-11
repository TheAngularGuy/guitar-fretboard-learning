import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocateGamesPage } from './locate-games.page';

describe('LocateGamesPage', () => {
  let component: LocateGamesPage;
  let fixture: ComponentFixture<LocateGamesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateGamesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocateGamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
