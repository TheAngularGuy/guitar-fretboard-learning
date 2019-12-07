import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { ExploreState } from './explore.state';

describe('Explore store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ExploreState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));
});
