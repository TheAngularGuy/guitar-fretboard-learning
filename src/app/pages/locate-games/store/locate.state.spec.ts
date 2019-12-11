import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { LocateState } from './locate.state';

describe('Locate store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([LocateState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));
});
