import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdentifyGamesPage } from './identify-games.page';

describe('IdentifyGamesPage', () => {
  let component: IdentifyGamesPage;
  let fixture: ComponentFixture<IdentifyGamesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifyGamesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdentifyGamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
