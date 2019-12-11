import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreGamesPage } from './explore-games.page';

describe('ExploreGamesPage', () => {
  let component: ExploreGamesPage;
  let fixture: ComponentFixture<ExploreGamesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreGamesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreGamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
