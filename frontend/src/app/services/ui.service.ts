import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { SetTitleNavbarAction } from '../reducer/ui/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  filter$ = new EventEmitter<String>();

  constructor(private store: Store<AppState>) {}

  updateTitleNavbar(newTitle: String = 'SAT') {
    this.store.dispatch(new SetTitleNavbarAction(newTitle));
  }
}
