import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { SettingsState } from './settings.state';

describe('Settings store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SettingsState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));
});
