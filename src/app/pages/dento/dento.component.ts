import {Component, OnInit} from '@angular/core';
import {EMPTY, merge, Observable} from "rxjs";
import {LocalstorageService} from "../../services/localstorage/localstorage.service";
import {ActivatedRoute, NavigationEnd, NavigationStart, ResolveEnd, ResolveStart, Router} from "@angular/router";
import {filter, mapTo} from "rxjs/operators";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ButtonControlService} from "../../services/buttonControl/button-control.service";
import {MatDialog} from "@angular/material/dialog";
import {OpenDialogService} from "../../services/OpenDialog/open-dialog.service";

@Component({
  selector: 'app-dento',
  templateUrl: './dento.component.html',
  styleUrls: ['./dento.component.css']
})
export class DentoComponent implements OnInit{


  constructor(
    private auth:AuthenticationService,
    private routes:Router,
    private route:ActivatedRoute,
    public buttonControlService:ButtonControlService,
    public localStorageService:LocalstorageService,
    private authenticateService:AuthenticationService,
    private dialog: MatDialog,
    private openDialogService:OpenDialogService
  ) {

  }

  ngOnInit(): void {  }






}
