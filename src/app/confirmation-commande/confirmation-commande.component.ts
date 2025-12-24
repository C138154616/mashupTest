import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientInfo } from '../models/ClientInfo';
import { CommandeHeader } from '../models/CommandeHeader';

@Component({
  selector: 'app-confirmation-commande',
  templateUrl: './confirmation-commande.component.html',
  styleUrl: './confirmation-commande.component.css',
})
export class ConfirmationCommandeComponent {
  @Input() client!: ClientInfo;
  @Output() headerChanged = new EventEmitter<CommandeHeader>();

  deliveryDate = '';
  customerOrderNo = '';
  comment = '';

  minDeliveryDate = '';
  isWeekendError = false;

  ngOnInit(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.minDeliveryDate = `${yyyy}-${mm}-${dd}`;
  }

  //   onDeliveryDateChange(event: any): void {
  //     const selectedDate = new Date(this.deliveryDate);
  //     const day = selectedDate.getDay(); // 0 = dimanche, 6 = samedi
  //     if (day === 0 || day === 6) {
  //       // Week-end
  //       this.isWeekendError = true;
  //       this.deliveryDate = '';
  //     } else {
  //       this.isWeekendError = false;
  //       this.emitHeader();
  //     }
  //   }

  emitHeader(): void {
    if (!this.client?.cuno) return;
    this.headerChanged.emit({
      clientCode: this.client.cuno,
      clientName: this.client.name || '',
      deliveryDate: this.deliveryDate,
      customerOrderNo: this.customerOrderNo,
      comment: this.comment,
    });
  }
}
