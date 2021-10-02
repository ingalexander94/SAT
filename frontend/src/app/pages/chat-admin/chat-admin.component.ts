import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, pluck } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { ResponseChatAdmin, UserChat } from 'src/app/model/chat';
import { ChatService } from 'src/app/services/chat.service';
import { StudentService } from 'src/app/services/student.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css'],
})
export class ChatAdminComponent implements OnInit, OnDestroy {
  receiver: UserChat = null;
  subscription: Subscription = new Subscription();
  subscription2: Subscription = new Subscription();
  transmitter: UserChat = null;
  chat: ResponseChatAdmin[] = [];
  role: String = '';
  codeStudent: String = '';
  loading: boolean = true;

  formChatAdmin: FormGroup;

  createFormChatAdmin(): FormGroup {
    return new FormGroup({
      message: new FormControl('', Validators.required),
    });
  }

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private notificationService: NotificationService,
    private studentService: StudentService,
    private store: Store<AppState>
  ) {
    this.formChatAdmin = this.createFormChatAdmin();
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('auth')
      .pipe(
        pluck('user'),
        filter((user) => user !== null),
        distinctUntilChanged()
      )
      .subscribe(({ nombre, apellido, documento, correo, rol, codigo }) => {
        this.transmitter = { nombre, apellido, documento, correo };
        this.role = rol;
        this.codeStudent = codigo;
      });
    this.subscription2 = this.route.params.subscribe(({ document }) => {
      this.getAdmin(document);
    });
  }

  async getAdmin(byData: String) {
    let receiver = null;
    if (this.role === 'estudiante') {
      receiver = await this.chatService.getAdmin(byData);
    } else {
      const {
        data: { nombre, apellido, correo, documento, codigo },
      } = await this.studentService.getByCode(byData);
      this.codeStudent = codigo;
      receiver = { nombre, apellido, documento, correo };
    }
    this.receiver = receiver;
    this.loadChat();
  }

  async onSubmit() {
    this.loading = true;
    if (!this.formChatAdmin.invalid) {
      const message: ResponseChatAdmin = {
        ...this.formChatAdmin.value,
        date: new Date().toISOString(),
        transmitter: this.transmitter,
        receiver: this.receiver,
      };
      const { data } = await this.chatService.sendMessageChatAdmin(message);
      this.chat = [...this.chat, data];

      const codeReceiver =
        this.role === 'estudiante' ? this.receiver.documento : this.codeStudent;

      const codeTransmitter =
        this.role === 'estudiante'
          ? this.codeStudent
          : this.transmitter.documento;

      const notification = {
        codeReceiver,
        codeTransmitter,
        roleTransmitter: this.role,
        date: new Date().toISOString(),
        title: `Ha recibido un mensaje de ${this.transmitter.nombre}`,
        url: `/estudiante/chat-admin/${codeTransmitter}`,
        isActive: true,
      };
      this.notificationService.sendNotification(notification);
      this.formChatAdmin.reset();
    }
    this.loading = false;
  }

  async loadChat() {
    this.loading = true;
    const data = await this.chatService.listChatAdmin({
      receiver: this.receiver.documento,
      transmitter: this.transmitter.documento,
    });
    this.chat = data;
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
