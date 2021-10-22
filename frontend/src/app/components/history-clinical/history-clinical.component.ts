import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { pluck, filter, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { dateHourFormat } from 'src/app/helpers/ui';
import { WellnessService } from 'src/app/services/wellness.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-history-clinical',
  templateUrl: './history-clinical.component.html',
  styleUrls: ['./history-clinical.component.css'],
})
export class HistoryClinicalComponent implements OnInit, OnDestroy {
  isEdit: Boolean = false;
  loading: Boolean = false;
  role: String = '';
  idRecord: String = '';
  student: String = '';
  loadingMeets: Boolean = false;
  history: Boolean = false;
  meetClinical: any = null;
  meets: any[] = [];
  formHistoryClinical: FormGroup;
  subscription: Subscription = new Subscription();

  createFormHistoryClinical(): FormGroup {
    return new FormGroup({
      pathological: new FormControl('', Validators.required),
      surgical: new FormControl('', Validators.required),
      traumatic: new FormControl('', Validators.required),
      allergicToxic: new FormControl('', Validators.required),
      pharmacological: new FormControl('', Validators.required),
      venereal: new FormControl('', Validators.required),
      gynecological: new FormControl('', Validators.required),
      others: new FormControl(''),
    });
  }

  constructor(
    private store: Store<AppState>,
    private wellnessService: WellnessService,
    private studentService: StudentService
  ) {
    this.formHistoryClinical = this.createFormHistoryClinical();
    this.toggleInputs();
  }

  ngOnInit(): void {
    this.subscription = this.store
      .pipe(
        map(({ ui: { userActive }, auth: { user } }) => ({ user, userActive })),
        filter(({ userActive, user }) => userActive !== null && user !== null)
      )
      .subscribe(({ user, userActive }) => {
        this.role = user.rol;
        this.getMeetsClinical(userActive.codigo, 'clinica');
      });
  }

  async getMeetsClinical(code: String, type: String) {
    this.loadingMeets = true;
    this.student = code;
    const res = await this.wellnessService.getMeetsHistory(code, type);
    this.meets = res;
    this.meets = this.meets.map((x) => ({
      ...x,
      dateFormat: dateHourFormat(x.meet.date, x.meet.hour),
    }));
    const record = await this.getRecord(code, type);
    if (record) {
      this.idRecord = record._id.$oid;
      this.formHistoryClinical
        .get('pathological')
        .setValue(record.pathological);
      this.formHistoryClinical.get('surgical').setValue(record.surgical);
      this.formHistoryClinical.get('traumatic').setValue(record.traumatic);
      this.formHistoryClinical
        .get('allergicToxic')
        .setValue(record.allergicToxic);
      this.formHistoryClinical
        .get('pharmacological')
        .setValue(record.pharmacological);
      this.formHistoryClinical.get('venereal').setValue(record.venereal);
      this.formHistoryClinical
        .get('gynecological')
        .setValue(record.gynecological);
      this.formHistoryClinical.get('others').setValue(record.others);
    }
    this.loadingMeets = false;
  }

  async getRecord(code: String, type: String) {
    return await this.studentService.getRecord(code, type);
  }

  showHistory(answer: boolean = true, meetClinical = null) {
    this.history = answer;
    this.meetClinical = meetClinical;
  }

  changeIsEdit(value: Boolean = true) {
    this.isEdit = value;
    this.toggleInputs(value);
  }

  async onSubmit() {
    this.loading = true;
    if (!this.formHistoryClinical.invalid) {
      let record = {
        ...this.formHistoryClinical.value,
        student: this.student,
      };
      if (this.idRecord) record = { ...record, _id: this.idRecord };
      const res = await this.studentService.saveRecord(record);
      this.idRecord = res._id;
    }
    this.isEdit = false;
    this.toggleInputs();
    this.loading = false;
  }

  toggleInputs(value: Boolean = false) {
    if (!value) {
      this.formHistoryClinical.get('pathological').disable();
      this.formHistoryClinical.get('surgical').disable();
      this.formHistoryClinical.get('traumatic').disable();
      this.formHistoryClinical.get('allergicToxic').disable();
      this.formHistoryClinical.get('pharmacological').disable();
      this.formHistoryClinical.get('venereal').disable();
      this.formHistoryClinical.get('gynecological').disable();
      this.formHistoryClinical.get('others').disable();
    } else {
      this.formHistoryClinical.get('pathological').enable();
      this.formHistoryClinical.get('surgical').enable();
      this.formHistoryClinical.get('traumatic').enable();
      this.formHistoryClinical.get('allergicToxic').enable();
      this.formHistoryClinical.get('pharmacological').enable();
      this.formHistoryClinical.get('venereal').enable();
      this.formHistoryClinical.get('gynecological').enable();
      this.formHistoryClinical.get('others').enable();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
