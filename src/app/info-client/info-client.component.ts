import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ClientInfo } from '../models/ClientInfo';
import { MIService } from '@infor-up/m3-odin-angular';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrl: './info-client.component.css',
})
export class InfoClientComponent implements OnChanges {
  @Input() clientInfo: ClientInfo | null = null;
  @Output() clientSelected = new EventEmitter<ClientInfo>();

  clientCode = '';
  client: ClientInfo | null = null;

  constructor(private miService: MIService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientInfo'] && this.clientInfo) {
      this.client = { ...this.clientInfo };
      this.clientCode = this.client.cuno ?? '';
    }
  }

  loadClient(): void {
    if (!this.clientCode) return;
    const request = {
      program: 'CRS610MI',
      transaction: 'GetBasicData',
      record: { CUNO: this.clientCode },
    };
    this.miService.execute(request).subscribe((response) => {
      const r = response.items[0];
      this.client = {
        cuno: r.CUNO,
        name: r.CUNM,
        phone: r.PHNO,
        address: r.CUA1,
        postalCity: `${r.PONO} ${r.TOWN}`,
        country: r.CSCD,
        assortment: r.CUCD,
        company: r.CONO,
        niveau1: r.ALCU,
        niveau2: r.ALCU,
      };
      this.clientSelected.emit(this.client);
    });
  }
}
