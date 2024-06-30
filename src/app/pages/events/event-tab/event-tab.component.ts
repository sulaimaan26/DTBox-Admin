import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DropdownCommonDisplay } from 'src/app/_model/commondisplay';
import { IEvents } from 'src/app/_model/events';

@Component({
  selector: 'app-event-tab',
  templateUrl: './event-tab.component.html',
  styleUrls: ['./event-tab.component.css'],
})
export class EventTabComponent implements OnInit {
  isUpdate = false;
  $subscription;
  eventId: number;
  dropdown: DropdownCommonDisplay;
  eventsData: IEvents;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.$subscription = this.activatedRoute.data.subscribe((data) => {
      if (data) {
        if (data.details) {
          // this.eventsData = data.details
          this.isUpdate = true;
        }

        if (data.dropdown) {
          this.dropdown = data.dropdown
          this.isUpdate = true;
        }
      }
    });
  }
}
