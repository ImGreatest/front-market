import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TuiSvgModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiInputModule } from "@taiga-ui/kit";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TuiSvgModule, TuiInputModule, TuiInputModule, TuiTextfieldControllerModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {}
