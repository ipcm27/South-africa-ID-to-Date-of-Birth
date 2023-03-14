import { Component } from '@angular/core';

@Component({
  selector: 'app-testing-this',
  templateUrl: './testing-this.component.html',
  styleUrls: ['./testing-this.component.css'],
})
export class TestingThisComponent {
  selectedMethod() {
    console.log('I was clicked');
  }
}
