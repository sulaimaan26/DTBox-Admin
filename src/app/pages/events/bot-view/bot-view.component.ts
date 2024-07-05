import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BotViewService } from 'src/app/services/bot-view.service';
import {
  BotInactiveSearchResponse,
  IBotViewDropdown,
} from 'src/app/_model/bot-view';

@Component({
  selector: 'app-bot-view',
  templateUrl: './bot-view.component.html',
  styleUrls: ['./bot-view.component.css'],
})
export class BotViewComponent implements OnInit {
  inActiveUser = new Subject<BotInactiveSearchResponse[]>();
  eventId: number;
  videoId: number[];
  showTable = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params.eventid) {
        this.eventId = parseInt(params.eventid);
      }
    });
  }

  getInActiveUser($event: {
    result: BotInactiveSearchResponse[];
    videoId: number[];
  }) {
    this.videoId = $event.videoId;
    let data = $event.result.map((e) => {
      e.IsGenerated = false;
      e.isSelected = true;
      return e;
    });
    this.inActiveUser.next(data);
    this.showTable = true;
  }

  getVideoId() {}
}
