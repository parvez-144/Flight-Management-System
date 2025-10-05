import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminReportService } from '../../services/admin-reports';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class AdminReportsComponent {
  selectedReport: string = '';
  scheduleId: string = '';
  data: any = null;
  loading = false;

  constructor(private reportService: AdminReportService) {}

  generateReport() {
    if (!this.selectedReport) return alert('Please select a report');
    this.loading = true;

    let request;
    if (this.selectedReport === 'occupancy') {
      if (!this.scheduleId) {
        alert('Please enter Schedule ID for occupancy report');
        this.loading = false;
        return;
      }
      request = this.reportService.getFlightOccupancy(this.scheduleId);
    } else if (this.selectedReport === 'cancellations') {
      request = this.reportService.getCancellations();
    } else if (this.selectedReport === 'revenue') {
      request = this.reportService.getRevenue();
    }

    request?.subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        alert(err.error?.message || 'Error fetching report');
        this.loading = false;
      }
    });
  }
}
