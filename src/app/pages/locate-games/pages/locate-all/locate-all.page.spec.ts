import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocateAllPage } from './locate-all.page';

describe('LocateAllPage', () => {
  let component: LocateAllPage;
  let fixture: ComponentFixture<LocateAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateAllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocateAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
