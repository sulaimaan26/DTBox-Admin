import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {numberSeries} from "../../_model/numberseries";
import {NumberseriesrelationService} from "../../services/numberseriesrelation/numberseriesrelation.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-numberseries-generator',
  templateUrl: './numberseries-generator.component.html',
  styleUrls: ['./numberseries-generator.component.css']
})
export class NumberseriesGeneratorComponent implements OnInit,OnDestroy {

  @Input() numberSeriesList:numberSeries[]
  @Output() generatedId = new EventEmitter<string>();
  showButton = true

  constructor(
    private numberseriesrelationService:NumberseriesrelationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {  }

  generateId(numberSeriesId:number){
    this.numberseriesrelationService.generateId(numberSeriesId).subscribe((res:any)=>{
      this.generatedId.emit(res.id)
      this.generatedId.unsubscribe()
      this.showButton = false
    })
  }

  ngOnDestroy(): void {

  }

}
