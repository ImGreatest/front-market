import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { TuiRootModule } from "@taiga-ui/core";
import { NavbarComponent } from "@layout";
import { AppRoutingModule } from "./app-routing.module";
import { RouterOutlet } from "@angular/router";

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    TuiRootModule,
    NavbarComponent,
    AppRoutingModule,
    RouterOutlet
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
