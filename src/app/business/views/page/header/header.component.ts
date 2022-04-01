import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {MatDialog} from '@angular/material/dialog';
import {AuthService, User} from '../../../../auth/service/auth.service';
import {emitDistinctChangesOnlyDefaultValue} from "@angular/compiler";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @Input()
  categoryName: string;

  @Input()
  user: User;

  @Input()
  showStat: boolean;

  @Output()
  toggleMenuEvent = new EventEmitter();

  @Output()
  toggleStatEvent = new EventEmitter<boolean>();

  isMobile: boolean;

  constructor(
    private dialogBuilder: MatDialog,
    private deviceService: DeviceDetectorService,
    private auth: AuthService
  ) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit(): void {}

  onToggleMenu(): void {
    this.toggleMenuEvent.emit();
  }

  onToggleStat(): void {
    this.toggleStatEvent.emit(!this.showStat)
  }

  logout(): void {
    this.auth.logout();
  }

}
