import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeTitle = "Welcome Ninjas"
  myString = "I love chicken"
  alertMe(val){
    alert(val)
  }
  constructor() { }

  ngOnInit() {
  }

}
