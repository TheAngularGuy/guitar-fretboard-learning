import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LostPage } from './lost.page';

describe('LostPage', () => {
  let component: LostPage;
  let fixture: ComponentFixture<LostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
