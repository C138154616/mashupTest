import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoModalComponent } from 'ids-enterprise-ng';
import { ClientInfo } from '../models/ClientInfo';

@Component({
  selector: 'app-historique-vente',
  templateUrl: './historique-vente.component.html',
  styleUrl: './historique-vente.component.css',
})
export class HistoriqueVenteComponent {
  @Input() clientCode: any;
  @ViewChild('DataGrid') dataGrid?: SohoDataGridComponent;
  isBusy = false;
  data: any[] = [];
  gridOptions?: SohoDataGridOptions;
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  constructor(private miService: MIService, private userService: UserService) {}
  ngOnInit(): void {
    this.gridOptions = {
      columns: [
        {
          id: 'selectionCheckbox',
          sortable: false,
          resizable: true,
          width: 50,
          formatter: Soho.Formatters.SelectionCheckbox,
          align: 'center',
        },
        { id: 'ORNO', name: 'Commande', field: 'ORNO', sortable: true },
        { id: 'ORDT', name: 'Date', field: 'ORDT', sortable: true },
        { id: 'STAT', name: 'Statut', field: 'ORST', sortable: true },
        { id: 'CUOR', name: 'Référence client', field: 'CUNO', sortable: true },
        { id: 'WHLO', name: 'Dépôt', field: 'FACI', sortable: true },
      ],
      selectable: 'single',
      rowHeight: 'small',
      filterable: true, // activer filtre par colonne
      uniqueId: 'ORNO',
      paging: true, // activer pagination
      pagesize: this.pageSize,
    };

    this.loadData(this.currentPage, this.pageSize);
  }
  loadData(page: number, pageSize: number) {
    this.isBusy = true;
    const skip = (page - 1) * pageSize;

    this.miService
      .execute({
        program: 'OIS100MI',
        transaction: 'SearchHead',
        record: { SQRY: this.clientCode, skip, take: pageSize, SORT: 'ORDT' },
      })
      .subscribe({
        next: (res: any) => {
          this.data = res.items || [];
          this.totalItems = res.totalCount || this.data.length; // si le serveur retourne total
          this.isBusy = false;
          console.log('DataGrid data:', this.data);
        },
        error: (err) => {
          console.error(err);
          this.data = [];
          this.isBusy = false;
        },
      });
  }
  onPageChange(event: any) {
    this.currentPage = event.page;
    this.pageSize = event.pageSize;
    this.loadData(this.currentPage, this.pageSize);
  }
}
