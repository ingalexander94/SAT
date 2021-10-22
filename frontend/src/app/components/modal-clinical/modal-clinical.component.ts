import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-clinical',
  templateUrl: './modal-clinical.component.html',
  styleUrls: ['./modal-clinical.component.css'],
})
export class ModalClinicalComponent implements OnInit {
  @Output() isClosed = new EventEmitter<boolean>();
  @Input() meetClinical: any = null;
  dateFormat: Date = new Date();

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
