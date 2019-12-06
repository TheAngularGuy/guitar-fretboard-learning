import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { PreferencesSetLeftyModeAction, PreferencesSetTunningAction } from './preferences.actions';
import { PreferencesState } from './preferences.state';

describe('Preferences store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PreferencesState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should dispatch an action and set leftHandedMode to true', () => {
    // Arrange
    const expectation = true;
    // Act
    store.dispatch(new PreferencesSetLeftyModeAction({ leftHandedMode: expectation }));
    const actualState = store.selectSnapshot(PreferencesState.getState);
    // Assert
    expect(actualState.leftHandedMode).toEqual(expectation);
  });

  it('should dispatch an action and set a different tuning', () => {
    // Arrange
    const expectation = 'D-A-D-G-A-D';
    // Act
    store.dispatch(new PreferencesSetTunningAction({ tuning: expectation }));
    const actualState = store.selectSnapshot(PreferencesState.getState);
    // Assert
    expect(actualState.tuning).toEqual(expectation);
  });
});
