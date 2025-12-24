import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MIService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.css',
})
export class ListArticleComponent {
  @Input() clientCode!: string;
  @ViewChild('DataGrid') dataGrid?: SohoDataGridComponent;

  isBusy = false;
  client: any = null;
  data: any[] = [];
  gridOptions: any;

  pageSize = 20;
  currentPage = 1;

  constructor(private miService: MIService) {}

  ngOnInit(): void {
    if (!this.clientCode) return;

    // Configuration du datagrid
    this.gridOptions = {
      columns: [
        {
          id: 'selectionCheckbox',
          formatter: Soho.Formatters.SelectionCheckbox,
          width: 50,
          align: 'center',
        },
        { id: 'ITNO', name: 'Article', field: 'ITNO', sortable: true },
        { id: 'DSC1', name: 'Description', field: 'DSC1', sortable: true },
        { id: 'PRICE', name: 'Prix', field: 'PRICE', sortable: true },
        {
          id: 'QuantityDemanded',
          name: 'Quantité demandée',
          field: 'QuantityDemanded',
          editor: 'text',
        },
        {
          id: 'Action',
          name: 'Action',
          field: 'Action',
          formatter: (row: number, cell: number) => {
            return '<span class="icon icon-delete" style="cursor:pointer"></span>';
          },
        },
      ],
      selectable: 'multiple',
      rowHeight: 'small',
      filterable: true,
      uniqueId: 'ITNO',
      paging: true,
      pagesize: this.pageSize,
    };

    this.loadClientInfo();
  }

  //  Récupérer infos client
  loadClientInfo() {
    this.isBusy = true;
    this.miService
      .execute({
        program: 'CRS610MI',
        transaction: 'GetBasicData',
        record: { CUNO: this.clientCode },
      })
      .subscribe({
        next: (res: any) => {
          this.client = res.items[0];
          this.loadArticles();
        },
        error: (err) => {
          console.error('Erreur chargement client', err);
          this.isBusy = false;
        },
      });
  }

  //  Récupérer tous les articles et filtrer selon le code assortiment du client
  loadArticles() {
    const skip = (this.currentPage - 1) * this.pageSize;

    this.miService
      .execute({
        program: 'MMS025MI',
        transaction: 'LstItem',
        record: { POPN: 'ITMR', skip, take: this.pageSize },
      })
      .subscribe({
        next: (res: any) => {
          // Filtrer articles selon le code assortiment du client (CUCD)
          this.data = res.items
            .filter((a: any) => a.CUCD === this.client?.CUCD)
            .map((a: any) => ({ ...a, QuantityDemanded: 1, Action: '' }));
          this.isBusy = false;
        },
        error: (err) => {
          console.error('Erreur chargement articles', err);
          this.data = [];
          this.isBusy = false;
        },
      });
  }

  // Supprimer une ligne
  onCellClick(event: any) {
    const columnId = event.column.id;
    if (columnId === 'Action') {
      const rowIndex = event.row;
      // Use an immutable update to trigger change detection instead of calling a non-existent renderRows()
      this.data = this.data.filter((_, idx) => idx !== rowIndex);
    }
  }

  // Pagination
  onPageChange(event: any) {
    this.currentPage = event.page;
    this.loadArticles();
  }
}
