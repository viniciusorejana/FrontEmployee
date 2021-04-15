import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bar-side',
  templateUrl: './bar-side.component.html',
  styleUrls: ['./bar-side.component.css']
})
export class BarSideComponent implements OnInit {

  horas: number;
  data = new Date();

  constructor() {
    setInterval(() => {
      this.horas = Date.now();
    }, 1)
  }

  ngOnInit() {
  }

}
