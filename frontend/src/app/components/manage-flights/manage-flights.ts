import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminFlightService } from '../../services/admin-fligh-service';

@Component({
  selector: 'app-manage-flights',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-flights.html',
  styleUrls: ['./manage-flights.css']
})
export class ManageFlightsComponent implements OnInit {
  flights: any[] = [];
  newFlight = { airline: '', source: '', destination: '', totalSeats: 0 };
  editingFlight: any = null;

  constructor(private flightService: AdminFlightService) {}

  ngOnInit() {
    this.loadFlights();
  }

  loadFlights() {
    this.flightService.getAll().subscribe({
      next: (res) => (this.flights = res),
      error: (err) => alert(err.error?.message || 'Failed to fetch flights'),
    });
  }

  addFlight() {
    this.flightService.addFlight(this.newFlight).subscribe({
      next: () => {
        alert('Flight added');
        this.newFlight = { airline: '', source: '', destination: '', totalSeats: 0 };
        this.loadFlights();
      },
      error: (err) => alert(err.error?.message || 'Add failed'),
    });
  }

  startEdit(flight: any) {
    this.editingFlight = { ...flight };
  }

  saveEdit() {
    this.flightService.updateFlight(this.editingFlight._id, this.editingFlight).subscribe({
      next: () => {
        alert('Flight updated');
        this.editingFlight = null;
        this.loadFlights();
      },
      error: (err) => alert(err.error?.message || 'Update failed'),
    });
  }

  deleteFlight(id: string) {
    if (confirm('Delete this flight?')) {
      this.flightService.deleteFlight(id).subscribe({
        next: () => {
          alert('Flight deleted');
          this.loadFlights();
        },
        error: (err) => alert(err.error?.message || 'Delete failed'),
      });
    }
  }
}
