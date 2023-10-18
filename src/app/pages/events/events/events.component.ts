import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  isUpdate = false;
  $subscription;
  eventId:number

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.$subscription = this.activatedRoute.data.subscribe((data) => {
      if (data) {
        if (data.details) {
          console.log(data.details.id);

          this.isUpdate = true;
        }
      }
    });
  }
}
