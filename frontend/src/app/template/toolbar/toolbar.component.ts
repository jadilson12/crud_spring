import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Categoria',
                items: [
                    {label: 'Nova'},
                    {separator: true},
                    {label: 'Listar'},
                ]
            }
        ];
  }
}
