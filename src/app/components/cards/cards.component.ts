import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() public productName?: string ;
  @Input() public refCode?: string ='null';
  @Input() public priority?: String;
  @Input() public description?: String;
  @Input() public entryDate?: string;
  @Input() public photo?: string

  constructor() { }

  ngOnInit(): void {
  }
}
