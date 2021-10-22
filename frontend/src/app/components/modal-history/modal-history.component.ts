import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-history',
  templateUrl: './modal-history.component.html',
  styleUrls: ['./modal-history.component.css'],
})
export class ModalHistoryComponent implements OnInit {
  @Output() isClosed = new EventEmitter<boolean>();
  @Input() meetPsychological: any = null;

  constructor() {}

  ngOnInit(): void {}

  onClick({ target }) {
    if (target.className === 'wrapper_alert') {
      this.close();
    }
  }

  close() {
    this.isClosed.emit(false);
  }
}
