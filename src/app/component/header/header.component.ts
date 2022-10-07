import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ButtonControlService } from 'src/app/services/buttonControl/button-control.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { headerButtons } from 'src/app/_model/headerButtons';
import { UserAuth } from 'src/app/_model/user';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { menuNode } from '../../_model/templateConfig/menuConfig';
import { filter, pluck, tap } from 'rxjs/operators';
import { CreateButton, Header } from '../../_model/header';
import { OpenDialogService } from '../../services/OpenDialog/open-dialog.service';
import { MatDialog } from '@angular/material/dialog';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  url: string;
}

/**
 * @title Tree with flat nodes
 */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  headerValue: Observable<Header>;
  buttonStat: Observable<CreateButton>;
  showLoader = true;
  router: string;
  isMenuOpen = {
    setupMenu: false,
  };
  buttons: headerButtons = {
    addNumberSeries: false,
    addNumberSeriesRelation: false,
    addConfigButton: false,
  };
  userName: string;
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor(
    private auth: AuthenticationService,
    private routes: Router,
    private route: ActivatedRoute,
    public buttonControlService: ButtonControlService,
    public localStorageService: LocalstorageService,
    private authenticateService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.headerValue = this.buttonControlService.updateBreadCrumb.pipe(
        tap(console.log)
      );
      this.buttonStat = this.buttonControlService.updateBreadCrumb.pipe(
        pluck('button')
      );

      this.router = this.routes.url;
      let session = JSON.parse(localStorage.getItem('currentUser')) as UserAuth;
      this.userName = session.username;
      console.table(session);

      setTimeout(() => {
        this.showLoader = false;
      }, 1000);

      this.buttonControlService.triggerMenu.subscribe((stat) => {
        if (stat) {
        }
      });
    });
  }

  ngDoCheck() {
    this.router = this.routes.url;
    this.isMenuOpen = this.isMenuOpen;
  }

  logout() {
    this.auth.logout();
    this.routes.navigate(['/user/login']);
  }

  triggerRowInTable(tableName) {
    this.buttonControlService.tableName.next(tableName);
  }

  openMenu(menuName = null, $event: Event = null) {
    switch (menuName) {
      case 'setupMenu':
        //$event.preventDefault()
        // /this.isMenuOpen.setupMenu = !this.isMenuOpen.setupMenu
        break;
      case 'addNumberSeries':
        this.buttons.addNumberSeries = true;
        this.buttons.addNumberSeriesRelation = false;
        this.buttons.addConfigButton = false;
        this.buttons.mapConfigButton = false;
        this.buttonControlService.triggerButton.next(this.buttons);
        break;
      case 'addNumberSeriesRelation':
        this.buttons.addNumberSeriesRelation = true;
        this.buttons.addNumberSeries = false;
        this.buttons.addConfigButton = false;
        this.buttons.mapConfigButton = false;
        this.buttonControlService.triggerButton.next(this.buttons);
        break;
      case 'addTemplateConfigs':
        this.buttons.addNumberSeriesRelation = false;
        this.buttons.addNumberSeries = false;
        this.buttons.addConfigButton = true;
        this.buttons.mapConfigButton = false;
        this.buttonControlService.triggerButton.next(this.buttons);
        break;
      case 'addJobCardButton':

      default:
        Object.entries(this.isMenuOpen).forEach((e) => {
          this.isMenuOpen[e[0]] = false;
        });
        console.log(this.isMenuOpen);

        break;
    }
  }

  private _transformer = (node: menuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      routeName: node.name.replace(' ', '').toLocaleLowerCase(),
      level: level,
      url: node.link,
    };
    ``;
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
}
