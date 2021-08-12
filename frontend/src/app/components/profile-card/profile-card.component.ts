import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { User } from 'src/app/model/auth';
import { Subscription } from 'rxjs';
import { MenuOptions } from 'src/app/model/ui';
import { menuRoutes } from 'src/app/model/data';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent implements OnInit, OnDestroy {
  @ViewChild('checkbox') checkbox: ElementRef;

  user: User = null;
  userShow: User = null;
  subscription: Subscription = new Subscription();
  routes: MenuOptions[] = menuRoutes;
  title: String;
  showUpdateProfile: boolean = false;
  loading: boolean = true;

  constructor(
    private location: Location,
    private store: Store<AppState>,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .pipe(
        filter(({ auth, ui }) => auth.user !== null && ui.userActive != null),
        map(({ auth, ui }) => ({
          user: auth.user,
          title: ui.titleNavbar,
          userActive: ui.userActive,
        }))
      )
      .subscribe(({ user, title, userActive }) => {
        this.user = user;
        this.userShow = userActive;
        this.title = title;
        this.loading = false;
      });
  }

  goBack() {
    this.location.back();
  }

  toNavigate() {
    this.checkbox.nativeElement.checked = false;
  }

  updateProfile(show: boolean = true) {
    this.showUpdateProfile = show;
  }

  closeMenu(e: FocusEvent) {
    if (!e.relatedTarget) {
      this.toNavigate();
    }
  }

  contact() {
    this.chatService.getMessages(this.userShow);
  }

  toFollowUp() {
    this.router.navigate(['/estudiante/notificar']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
