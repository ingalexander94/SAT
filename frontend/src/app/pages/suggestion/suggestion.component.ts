import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Title } from 'src/app/model/ui';
import { UiService } from 'src/app/services/ui.service';
import { WellnessService } from 'src/app/services/wellness.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css'],
})
export class SuggestionComponent implements OnInit {
  title: Title = {
    title: 'Lista de segerencias',
  };

  suggestions: any[] = [];
  profits: any[] = [];
  selections: any[] = [];
  loading: boolean = true;
  page: number = 1;
  perPage: number = 5;
  totalPages: number[] = [1];
  subscription: Subscription = new Subscription();
  show: String = '';
  @ViewChild('options') options: ElementRef;

  constructor(
    private uiService: UiService,
    private route: ActivatedRoute,
    private wellnessService: WellnessService
  ) {
    this.uiService.updateTitleNavbar('Sugerencias');
  }

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(pluck('pagina'))
      .subscribe((page = 1) => this.getSuggestion(page));
  }

  async getSuggestion(page) {
    this.loading = true;
    const res = await this.wellnessService.paginateSuggestion(
      page,
      this.perPage
    );
    const profits = await this.wellnessService.getProfits();
    this.profits = profits;
    this.suggestions = res.data;
    this.totalPages = Array(res.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
    this.loading = false;
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

  changeShow(newShow) {
    this.show = newShow;
    this.options.nativeElement.checked = false;
  }

  onSubmit({ target }) {
    const formName = target.name;
    let value = null;
    if (formName === 'byDate') {
      value = {
        from: new Date(target[0].value).toISOString(),
        to: new Date(target[1].value).toISOString(),
      };
    } else {
      value = {
        value: target[0].value,
      };
    }
    console.log(value);
    // TODO: Haga lo que sigue niver
  }
}
