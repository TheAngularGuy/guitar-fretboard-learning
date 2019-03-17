import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateComponent } from './locate.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

describe('LocateComponent', () => {
  let component: LocateComponent;
  let fixture: ComponentFixture<LocateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocateComponent],
      imports: [
        CommonModule,
        SharedModule,
      ]
    });

    fixture = TestBed.createComponent(LocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
