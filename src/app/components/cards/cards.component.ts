import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() public productName?: String ;
  @Input() public refCode?: String;
  @Input() public priority?: String;
  @Input() public description?: String;
  @Input() public entryDate?: String;
  @Input() public photo?: String

  constructor() { }

  ngOnInit(): void {
  }
}
