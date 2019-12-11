import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { IdentifyState } from './identify.state';

describe('Identify store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([IdentifyState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));
});
