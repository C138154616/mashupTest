import { Component, ViewChild, Input, OnInit } from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css',
})
export class CommandeComponent implements OnInit {
  @Input() clientCode: any;
  showPopup = false;
  showPopupArticle = false;

  @ViewChild(SohoDataGridComponent)
  sohoDataGridComponent?: SohoDataGridComponent;

  gridOptions: any = null;
  rowCounter = 1;

  ngOnInit(): void {
    this.gridOptions = {
      columns: [
        {
          id: 'lineNo',
          name: 'N° de ligne',
          field: 'lineNo',
          width: 50,
          sortable: false,
          formatter: Soho.Formatters.Text,
        },
        {
          id: 'article',
          name: 'Article',
          field: 'article',
          width: 100,
          sortable: false,
          formatter: Soho.Formatters.Text,
          editor: Soho.Editors.Input,
        },
        {
          id: 'description',
          name: 'Description',
          field: 'description',
          width: 200,
          sortable: false,
          formatter: Soho.Formatters.Text,
          editor: Soho.Editors.Input,
        },
        {
          id: 'quantity',
          name: 'Quantité',
          field: 'quantity',
          width: 100,
          sortable: false,
          formatter: Soho.Formatters.Decimal,
          editor: Soho.Editors.Input,
        },
        {
          id: 'unit',
          name: 'U/M',
          field: 'unit',
          width: 80,
          sortable: false,
          formatter: Soho.Formatters.Text,
          editor: Soho.Editors.Input,
        },
        {
          id: 'totalPrice',
          name: 'Prix Totale',
          field: 'totalPrice',
          width: 100,
          sortable: false,
          formatter: Soho.Formatters.Decimal,
        },
        {
          id: 'action',
          name: 'Action',
          field: 'action',
          width: 80,
          sortable: false,
          formatter: (
            _row: any,
            _cell: any,
            _value: any,
            _column: any,
            grid: any,
            row: any
          ) => {
            return `<button soho-button="icon" class="delete-row" data-id="${row.lineNo}"><i class="icon icon-delete"></i></button>`;
          },
        },
      ],
      dataset: [],
      editable: true,
      idProperty: 'lineNo',
      selectable: 'multiple',
      rowHeight: 'small',
      clickToSelect: false,
    };
  }

  closePopup() {
    this.showPopup = false;
  }

  confirmPopup() {
    console.log('Action confirmée !');
    this.showPopup = false;
  }

  closePopupArticle() {
    this.showPopupArticle = false;
  }

  confirmPopupArticle() {
    console.log('Action confirmée !');
    this.showPopupArticle = false;
  }

  addEmptyRow() {
    const newRow = {
      lineNo: this.rowCounter++,
      article: '',
      quantity: 0,
      unit: '',
      totalPrice: 0,
      action: '',
    };
    this.sohoDataGridComponent?.addRow(newRow, 'bottom');
  }

  // Gestion de la suppression depuis le bouton Action
  onDeleteRow(lineNo: number) {
    const index = this.sohoDataGridComponent?.dataset.findIndex(
      (row: any) => row.lineNo === lineNo
    );
    if (index !== undefined && index > -1) {
      this.sohoDataGridComponent?.dataset.splice(index, 1);
      this.sohoDataGridComponent?.updated();
    }
  }

  ngAfterViewInit() {
    // Écoute click sur le bouton delete dans la colonne Action
    const gridElement = this.sohoDataGridComponent?.['element'];
    if (gridElement) {
      $(gridElement).on('click', '.delete-row', (e: any) => {
        const lineNo = parseInt($(e.currentTarget).data('id'), 10);
        this.onDeleteRow(lineNo);
      });
    }
  }
}
