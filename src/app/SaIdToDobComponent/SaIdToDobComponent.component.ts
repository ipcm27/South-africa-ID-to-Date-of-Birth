import { Component } from '@angular/core';

@Component({
  selector: 'app-sa-id-to-dob',
  templateUrl: './SaIdToDobComponent.component.html',
  styleUrls: ['./SaIdToDobComponent.component.css'],
})
export class SaIdToDobComponent {
  id: string = '';
  dob!: string;
  showDob: boolean = false;
  now = new Date();
  currentYear = this.now.getFullYear();

  constructor() {}

  ngOnInit(): void {}

  onKeydownId($event: Event) {
    console.log($event);
    if (this.id.length == 6) {
      this.showDob = true;

      const year = parseInt(this.id.slice(0, 2));
      const month = this.id.slice(2, 4);
      const day = this.id.slice(4, 6);

      if (year < 10) {
        this.dob = '200' + year + '/' + month + '/' + day;
      } else if (year < new Date().getFullYear() % 100) {
        this.dob = '20' + year + '/' + month + '/' + day;
      } else {
        this.dob = '19' + year + '/' + month + '/' + day;
      }
    }
    return this.dob;
  }
}
