import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BotViewService } from 'src/app/services/bot-view.service';
import {
  BotInactiveSearchResponse,
  IBotViewDropdown,
} from 'src/app/_model/bot-view';

@Component({
  selector: 'app-bot-search-view',
  templateUrl: './bot-view-search.component.html',
  styleUrls: ['./bot-view-search.component.css'],
})
export class BotViewSearchComponent implements OnInit {
  salesCodeForm: FormGroup;
  dropdown: IBotViewDropdown;
  submitted = false;
  @Input() eventId: number;
  selectedIgnoredEvents: number;
  processing = false;
  @Output() searchData = new EventEmitter<{
    result: BotInactiveSearchResponse[];
    videoId: number;
  }>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly botViewService: BotViewService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.eventId) {
      this.salesCodeForm = this.formBuilder.group({
        eventId: [this.eventId, Validators.required],
        VideoId: ['', Validators.required],
        userCount: [10, Validators.required],
        lastLogindateInUTC: [this.getDays(30), Validators.required],
        ignoreEvents: [],
      });

      this.botViewService.getdropdown(this.eventId).subscribe((res) => {
        this.dropdown = res;
        this.addAllEventsToIgnore();
      });
    }
  }

  get f() {
    return this.salesCodeForm?.controls;
  }

  addAllEventsToIgnore() {
    if (this.dropdown.events.length > 0) {
      this.salesCodeForm.patchValue({
        ignoreEvents: [this.dropdown.events[0].id],
      });
    }
  }

  formatDate(date: string) {
    return new Date(date).toISOString();
  }

  getDays(days = 30) {
    let date = new Date();
    let last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
    return last.toISOString().slice(0, 10);
  }

  onSubmit() {
    this.submitted = true;
    if (this.salesCodeForm.invalid) {
      return;
    }

    this.processing = true;
    this.botViewService.searchInActiveUser(this.salesCodeForm.value).subscribe(
      (res) => {
        this.processing = false;
        this.searchData.emit({ result: res, videoId: this.f.VideoId.value });
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }
}
