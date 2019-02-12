// 83. Creating Member Cards to display on our Member list page
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  // 83. Creating Member Cards to display on our Member list page
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
