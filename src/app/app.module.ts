import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Log } from '@infor-up/m3-odin';
import { M3OdinModule } from '@infor-up/m3-odin-angular';
import {
  SohoButtonModule,
  SohoComponentsModule,
  SohoIconModule,
} from 'ids-enterprise-ng'; // TODO Consider only importing individual SoHo modules in production
import { AppComponent } from './app.component';
import { StepprsComponent } from './stepprs/stepprs.component';
import { InfoClientComponent } from './info-client/info-client.component';
import { SohoAutoCompleteModule } from 'ids-enterprise-ng';
import { CommandeComponent } from './commande/commande.component';
import { HistoriqueVenteComponent } from './historique-vente/historique-vente.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { ConfirmationCommandeComponent } from './confirmation-commande/confirmation-commande.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DateM3Pipe } from './shared/pipes/date-m3.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    StepprsComponent,
    InfoClientComponent,
    CommandeComponent,
    HistoriqueVenteComponent,
    ListArticleComponent,
    ConfirmationCommandeComponent,
    HeaderComponent,
    FooterComponent,
    DateM3Pipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SohoComponentsModule,
    M3OdinModule,
    SohoAutoCompleteModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US',
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (locale: string) => () => {
        Soho.Locale.culturesPath = 'assets/ids-enterprise/js/cultures/';
        return Soho.Locale.set(locale).catch((err) => {
          Log.error('Failed to set IDS locale', err);
        });
      },
      deps: [LOCALE_ID],
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
