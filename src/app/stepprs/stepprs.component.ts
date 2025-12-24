import { Component, OnInit, Output } from '@angular/core';
import { ClientInfo } from '../models/ClientInfo';
import { CommandeHeader } from '../models/CommandeHeader';

@Component({
  selector: 'app-stepprs',
  standalone: false,
  templateUrl: './stepprs.component.html',
  styleUrl: './stepprs.component.css',
})
export class StepprsComponent implements OnInit {
  currentStep = 0;
  selectedClient: ClientInfo | null = null;
  commandeHeader!: CommandeHeader;
  steps = ['Client', 'Commande', 'Confirmation'];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  next(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previous(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onClientSelected(client: ClientInfo) {
    this.selectedClient = client;
  }

  onHeaderChanged(header: CommandeHeader) {
    this.commandeHeader = header;
    console.log('Header commande:', header);
  }
}
