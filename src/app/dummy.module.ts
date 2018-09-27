// These unused NgModules keep the Angular Language Service happy.
// The AppModule registers the final versions of these components
import { NgModule } from '@angular/core';

import { AppComponent as app_initial } from './app-initial.component';
@NgModule({ declarations: [ app_initial ] })
export class AppModuleInitial {}
