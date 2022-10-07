import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NumberseriesService} from "../../services/numberseries/numberseries.service";
import {NotificationService} from "../../services/NotificationService/notification-service.service";
import {TemplatePageName} from "../../_model/templateConfig/templatePageName";
import {TemplateService} from "../../services/templateconfig/template/template.service";
import {GroupService} from "../../services/templateconfig/group/group.service";
import {TypeService} from "../../services/templateconfig/type/type.service";
import {SubtypeService} from "../../services/templateconfig/subtype/subtype.service";
import {Template} from "../../_model/templateConfig/Template";
import {Group} from "../../_model/templateConfig/Group";
import {Type} from "../../_model/templateConfig/Type";
import {SubType} from "../../_model/templateConfig/SubType";
import {ValidationError} from "../../_model/ValidationMessaage";
import {ValidationService} from "../../services/ValidationService/validation-service.service";

@Component({
  selector: 'app-config-popup',
  templateUrl: './config-popup.component.html',
  styleUrls: ['./config-popup.component.css']
})
export class ConfigPopupComponent implements OnInit {

  @Output() closePopup:EventEmitter<boolean> = new EventEmitter();
  @Input() configId:number;
  @Input() configType:TemplatePageName;

  configForm: FormGroup;
  submitted =false;
  data: Template | Group | Type | SubType;

  constructor(
    private formBuilder: FormBuilder,
    private numberSeriesService: NumberseriesService,
    private notificationService: NotificationService,
    private templateService:TemplateService,
    private groupService:GroupService,
    private typeService:TypeService,
    private subtypeService:SubtypeService,
    private validationService:ValidationService
  ) { }

  ngOnInit(): void {
    this.configForm = this.formBuilder.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
          Validators.pattern(this.validationService.regex.allowOnlyCharacter)
        ]
      ],
      description: ['',
        [
          Validators.maxLength(50)
        ]
      ]
    })

    if(!this.configId) return;
    this.getTemplateInfo(this.configType).subscribe((d)=>{
      this.data = d;
      this.configForm.setValue({
        name:d.name,
        description:d.description == 'null' || null ? '' : d.description
      })
    })
  }

  get f() { return this.configForm.controls; }

  closeModal(){
    this.closePopup.emit(false)
  }

  saveTemplateInfo(Name:TemplatePageName,formData){
    switch (Name){
      case TemplatePageName.TYPEPAGE:
        return this.saveAndUpdateGroupInfo(formData);
      case TemplatePageName.SERVICESPAGE:
        return this.saveAndUpdateTemplateInfo(formData);
      case TemplatePageName.MODEPAGE:
        return this.saveAndUpdateSubTypeInfo(formData);
      case TemplatePageName.CATEGORYPAGE:
        return this.saveAndUpdateTypeInfo(formData);
    }
  }

  getTemplateInfo(Name:TemplatePageName){
    switch (Name){
      case TemplatePageName.TYPEPAGE:
        return this.groupService.getSingleGroupInfo(this.configId)
      case TemplatePageName.SERVICESPAGE:
        return this.templateService.getSingleTemplateInfo(this.configId)
      case TemplatePageName.MODEPAGE:
        return this.subtypeService.getSinglesubTypeInfo(this.configId)
      case TemplatePageName.CATEGORYPAGE:
        return this.typeService.getSingletypeInfo(this.configId)
    }
  }

  saveAndUpdateTemplateInfo(formData){
    if(this.configId) return this.templateService.updateTemplate(this.configId,formData)
    return this.templateService.addTemplate(formData)
  }

  saveAndUpdateGroupInfo(formData){
    if(this.configId) return this.groupService.updateGroup(this.configId,formData)
    return this.groupService.addGroup(formData)
  }

  saveAndUpdateTypeInfo(formData){
    if(this.configId) return this.typeService.updatetype(this.configId,formData)
    return this.typeService.addtype(formData)
  }

  saveAndUpdateSubTypeInfo(formData){
    if(this.configId) return this.subtypeService.updatesubType(this.configId,formData)
    return this.subtypeService.addsubType(formData)
  }



  onSubmit(){
    this.submitted = true;

    if (this.configForm.invalid) {
      return;
    }

    const formdata = new FormData()
    formdata.set("name",this.configForm.get('name').value)
    formdata.set("description",this.configForm.get('description').value)

    let message = this.configId ? this.configType+' updated successfully' : this.configType+' added successfully'

    this.saveTemplateInfo(this.configType,formdata).subscribe((succ)=>{
      if(succ){
        this.notificationService.showSuccess(message,'Success')
        this.closeModal()
      }
    },(err:ValidationError)=>{
      console.log(err)
      this.notificationService.showError(err.errors[0].message,'Failed')
    })
  }

  ngOnDestroy(){
    this.configId = undefined
    console.log(this.configId)
    console.log('closed')
  }

}
