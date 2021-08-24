import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, pluck } from 'rxjs/operators';
import { showAlert } from 'src/app/helpers/alert';
import {
  getValueOfLocalStorage,
  saveInLocalStorage,
} from 'src/app/helpers/localStorage';
import { Title } from 'src/app/model/ui';
import { UiService } from 'src/app/services/ui.service';
import { WellnessService } from 'src/app/services/wellness.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css'],
})
export class SuggestionComponent implements OnInit, OnDestroy {
  title: Title = {
    title: 'Lista de segerencias',
  };
  suggestions: any[] = [];
  profits: any[] = [];
  selections: any[] = [];
  loading: boolean = true;
  page: number = 1;
  perPage: number = 1;
  totalPages: number[] = [1];
  subscription: Subscription = new Subscription();
  subscription2: Subscription = new Subscription();
  show: String = '';
  startDate: string = new Date().toISOString().split('T')[0];
  endDate: string = new Date().toISOString().split('T')[0];
  @ViewChild('options') options: ElementRef;

  constructor(
    private uiService: UiService,
    private route: ActivatedRoute,
    private wellnessService: WellnessService
  ) {
    this.uiService.updateTitleNavbar('Sugerencias');
  }

  ngOnInit(): void {
    this.getProfits();
    this.subscription = this.route.params
      .pipe(pluck('pagina'))
      .subscribe((page = 1) => {
        const filter = getValueOfLocalStorage('filter');
        !filter ? this.getSuggestion(page) : this.onSubmit({ target: null });
      });
    this.subscription2 = this.uiService.filter$
      .pipe(
        filter((code) => code.length > 0),
        distinctUntilChanged()
      )
      .subscribe(async (code) => {
        if (code.length === 7 && code.match(/^[0-9]+$/)) {
          this.filterByCode(code);
        } else {
          showAlert('warning', 'Código incorrecto');
        }
      });
  }

  selected(index) {
    const select = !this.suggestions[index].select;
    const id = this.suggestions[index]._id;
    this.suggestions[index].select = select;
    if (select) {
      this.selections = [...this.selections, id];
    } else {
      this.selections = this.selections.filter((item) => item !== id);
    }
  }

  delete() {
    alert(this.selections);
  }

  all({ target }) {
    this.selections.length = 0;
    this.suggestions = this.suggestions.map((item) => {
      this.selections.push(item._id);
      item.select = target.checked;
      return item;
    });
    if (!target.checked) this.selections.length = 0;
  }

  getIcon(risk) {
    switch (risk) {
      case 'academico':
        return 'fas fa-id-badge';
      case 'individual':
        return 'fas fa-male';
      case 'socioeconomico':
        return 'fas fa-hand-holding-usd';
      case 'institucional':
        return 'fas fa-university';
      case 'psicologo':
        return 'fas fa-head-side-virus';
      case 'medico':
        return 'fas fa-user-md';
      case 'sacerdote':
        return 'fas fa-university';
      case 'trabajadorSocial':
        return 'fas fa-users';
      default:
        return 'fas fa-id-badge';
    }
  }

  async getProfits() {
    const profits = await this.wellnessService.getProfits();
    this.profits = profits;
  }

  changeShow(newShow) {
    this.show = newShow;
    this.options.nativeElement.checked = false;
    if (!newShow) {
      localStorage.removeItem('filter');
      this.getSuggestion(1);
    }
  }

  async onSubmit({ target }) {
    this.loading = true;
    let body = {};
    if (target) {
      const formName = target.name;
      if (formName === 'byDate') {
        const from = new Date(target[0].value);
        from.setHours(0);
        from.setMinutes(0);
        from.setSeconds(0);
        from.setMilliseconds(0);
        from.setDate(from.getDate() + 1);
        const to = new Date(target[1].value);
        to.setHours(0);
        to.setMinutes(0);
        to.setSeconds(0);
        to.setMilliseconds(0);
        to.setDate(to.getDate() + 1);
        body = {
          filter: formName,
          value: {
            from: from.toISOString(),
            to: to.toISOString(),
          },
        };
      } else {
        body = {
          filter: formName,
          value: target[0].value,
        };
      }
      saveInLocalStorage('filter', body);
    } else {
      const filter = getValueOfLocalStorage('filter');
      body = filter;
    }
    const res = await this.wellnessService.filterSuggestion(
      this.page,
      this.perPage,
      body
    );
    this.paginate(res);
  }

  async getSuggestion(page) {
    this.loading = true;
    const res = await this.wellnessService.paginateSuggestion(
      page,
      this.perPage
    );
    this.paginate(res);
  }

  async paginate(res) {
    this.suggestions = res.data;
    this.totalPages = Array(res.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
    this.loading = false;
  }

  async filterByCode(code) {
    this.loading = true;
    const res = await this.wellnessService.filterSuggestion(
      this.page,
      this.perPage,
      {
        filter: 'byCode',
        value: code,
      }
    );
    if (!code) showAlert('warning', 'No se encontrarón resultados');
    this.paginate(res);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
