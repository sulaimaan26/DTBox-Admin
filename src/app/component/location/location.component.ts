import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { myLocation } from 'src/app/_model/location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Output() locationInput:EventEmitter<myLocation> = new EventEmitter()
  @Input() locationInfo:BehaviorSubject<myLocation> = new BehaviorSubject(null);

  locationData:myLocation[] = [];
  countries:string[] = [];
  states:string[] = [];
  cities:string[] = [];

  locationForm: FormGroup;
  submitted = false;

  ngOnInit(){}

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private locationService:LocationService
  // ) { }
  //
  // ngOnInit(): void {
  //   this.locationForm = this.formBuilder.group({
  //     city: ['', Validators.required],
  //     country: ['', Validators.required],
  //     pincode: ['',
  //       [
  //         Validators.required,
  //         Validators.maxLength(8)
  //       ]
  //     ],
  //     state:['', Validators.required]
  //   });
  //
  //   this.getCountry()
  //
  //   this.updateInfo();
  // }
  //
  // getCountry(){
  //   this.locationService.getCountry().subscribe((res:myLocation[])=>{
  //       res.map((country)=>{
  //         this.countries.push(country.country_name)
  //       })
  //
  //       console.log(this.countries);
  //
  //   })
  // }
  //
  // updateInfo(){
  //   this.locationInfo.subscribe((locationDat)=>{
  //
  //     console.log(locationDat);
  //
  //
  //     if(locationDat === null) return;
  //
  //     this.locationForm.patchValue({
  //       city:locationDat.city_name,
  //       country:locationDat.country_name,
  //       pincode:locationDat.pincode,
  //       state:locationDat.state_name
  //     })
  //
  //     this.searchPincode()
  //   })
  //
  // }
  //
  // getState($event){
  //   let country  = $event.target.value
  //   this.locationService.getState(country).subscribe((res:myLocation[])=>{
  //       this.states = []
  //       res.map((state)=>{
  //         this.states.push(state.state_name)
  //       })
  //   })
  // }
  //
  // getCity($event){
  //   let state  = $event.target.value
  //   this.locationService.getCity(state).subscribe((res:myLocation[])=>{
  //     this.cities = []
  //       res.map((city)=>{
  //         this.cities.push(city.city_name)
  //       })
  //   })
  // }
  //
  // searchPincode(){
  //
  //   let searchPincode =  this.locationForm.get('pincode').value
  //   let result:myLocation;
  //
  //   this.locationService.searchPincode(searchPincode).subscribe((res:myLocation)=>{
  //
  //       if(res == null) {
  //         this.locationData = []
  //         this.countries = []
  //         this.states = []
  //         this.cities = []
  //         return
  //       };
  //
  //       this.countries = [res.country_name]
  //       this.states = [res.state_name]
  //       this.cities = [res.city_name]
  //
  //       this.locationForm.setValue({
  //         city:res.city_name,
  //         country:res.country_name,
  //         pincode:res.pincode,
  //         state:res.state_name
  //       })
  //
  //       this.locationInput.emit({
  //         city_name:this.locationForm.get('city').value,
  //         country_name:this.locationForm.get('country').value,
  //         pincode:this.locationForm.get('pincode').value,
  //         state_name:this.locationForm.get('state').value
  //       })
  //   },
  //   (err)=>{
  //       console.log(err);
  //
  //   })}


}
