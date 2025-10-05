import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminScheduleService } from '../../services/admin-schedule';
import { AdminFlightService } from '../../services/admin-fligh-service';

@Component({
  selector: 'app-manage-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-schedules.html',
  styleUrls: ['./manage-schedules.css']
})
export class ManageSchedulesComponent implements OnInit {
  schedules: any[] = [];
  flights: any[] = [];
  newSchedule = {
    flight: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: 0,
    status: 'ON_TIME',
  };
  editingSchedule: any = null;

  constructor(private scheduleService: AdminScheduleService, private flightService: AdminFlightService) {}

  ngOnInit() {
    this.loadSchedules();
    this.flightService.getAll().subscribe(res => (this.flights = res));
  }

  loadSchedules() {
    this.scheduleService.getAll().subscribe({
      next: (res) => (this.schedules = res),
      error: (err) => alert(err.error?.message || 'Failed to fetch schedules'),
    });
  }

  addSchedule() {
    this.scheduleService.addSchedule(this.newSchedule).subscribe({
      next: () => {
        alert('Schedule added');
        this.newSchedule = { flight: '', departureTime: '', arrivalTime: '', availableSeats: 0, status: 'ON_TIME' };
        this.loadSchedules();
      },
      error: (err) => alert(err.error?.message || 'Add failed'),
    });
  }

  startEdit(s: any) {
    this.editingSchedule = { ...s };
  }

  saveEdit() {
    this.scheduleService.updateSchedule(this.editingSchedule._id, this.editingSchedule).subscribe({
      next: () => {
        alert('Schedule updated');
        this.editingSchedule = null;
        this.loadSchedules();
      },
      error: (err) => alert(err.error?.message || 'Update failed'),
    });
  }

  deleteSchedule(id: string) {
    if (confirm('Delete this schedule?')) {
      this.scheduleService.deleteSchedule(id).subscribe({
        next: () => {
          alert('Schedule deleted');
          this.loadSchedules();
        },
        error: (err) => alert(err.error?.message || 'Delete failed'),
      });
    }
  }
}
