import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {MatDialog} from '@angular/material/dialog';
import {AuthService, User} from '../../../../auth/service/auth.service';

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

  @Output()
  toggleMenuEvent = new EventEmitter();

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

  logout(): void {
    this.auth.logout();
  }

}
