import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdentifyPage } from './identify.page';

describe('IdentifyPage', () => {
  let component: IdentifyPage;
  let fixture: ComponentFixture<IdentifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdentifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
