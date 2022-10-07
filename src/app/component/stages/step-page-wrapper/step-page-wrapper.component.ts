import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PageDirective} from "../page-directive.directive";
import {Observable, ReplaySubject} from "rxjs";
import {MappingInfo} from "../../../_model/templateConfig/menuConfig";

@Component({
  selector: 'app-step-page-wrapper',
  templateUrl: './step-page-wrapper.component.html',
  styleUrls: ['./step-page-wrapper.component.css']
})
export class StepPageWrapperComponent implements OnInit {

  @Input() item?: any;
  @Input() stageId?: any;
  @Input() jobId?: string;
  @Input() mapInfo?: MappingInfo;
  @Input() $dropdowns?: Observable<any>;
  @Input() $stageData?: Observable<any>;
  @Input() fields?: string[];
  //@ViewChild(PageDirective) pageHost: PageDirective;
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) myRef


  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    // if (this.item == undefined) {
    //   console.error('Item undefined');
    //   return
    // }
    // //console.log(this.item)
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item);
    // const viewContainerRef = this.myRef.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngAfterViewInit() {
    if (this.item == undefined) {
      console.error('Item undefined');
      return
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.item);
    const ref = this.myRef.createComponent(factory);
    ref.instance.stageId = this.stageId
    ref.instance.$dropdowns = this.$dropdowns
    ref.instance.$stageData = this.$stageData
    ref.instance.jobId = this.jobId
    ref.instance.mapInfo = this.mapInfo
    ref.instance.fields = this.fields
    ref.changeDetectorRef.detectChanges();
  }

}
