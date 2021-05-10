import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/Authentication.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  incidentLogs= [];
  constructor(private authService: AuthenticationService) { }
 
  ngOnInit() {
    this.authService.getData('admin/incident/getbyId').then((res) => {
      if (res.success) {
        this.incidentLogs = res.data;
      }
    })
  } 
}
