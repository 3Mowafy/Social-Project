import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-err404',
  templateUrl: './err404.component.html',
  styleUrls: ['./err404.component.css'],
})
export class Err404Component implements OnInit {
  @Input() mydate: any;
  constructor() {}

  ngOnInit(): void {}
}
