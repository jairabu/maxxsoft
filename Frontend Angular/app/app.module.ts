import {
  NgModule,
  LOCALE_ID
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatPaginatorIntl,
  MatSelectModule,
  MatSnackBarModule,
  MatDividerModule,
  MatDialogModule,
  MatTooltipModule
} from "@angular/material";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { getBrPaginatorIntl } from './util/br-paginator-intl';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";

import { AppComponent } from './app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ContatoComponent } from './components/contato/contato.component';
import { ServicoComponent } from './components/servico/servico.component';
import { TipoServicoComponent } from './components/tipo-servico/tipo-servico.component';
import { StatusServicoComponent } from './components/status-servico/status-servico.component';
import { HomeComponent } from './components/home/home.component';
import { ContatoService } from './services/contato.service';
import { ServicoService } from './services/servico.service';
import { StatusServicoService } from './services/status-servico.service';
import { TipoServicoService } from './services/tipo-servico.service';
import { UsuarioService } from './services/usuario.service';
import { AjudaComponent } from './components/ajuda/ajuda.component';

registerLocaleData(localePt);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align:"right", allowNegative:true, decimal:",", precision:2, prefix:"R$ ", suffix:"", thousands:"."
};

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    ContatoComponent,
    ServicoComponent,
    TipoServicoComponent,
    StatusServicoComponent,
    HomeComponent,
    AjudaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    CurrencyMaskModule,
    NgbModule.forRoot(),
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
   ContatoService,
   ServicoService,
   StatusServicoService,
   TipoServicoService,
   UsuarioService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useValue: getBrPaginatorIntl() },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
