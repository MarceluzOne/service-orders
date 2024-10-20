import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipament-card',
  templateUrl: './equipament-card.component.html',
  styleUrls: ['./equipament-card.component.scss']
})
export class EquipamentCardComponent implements OnInit {
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
