import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

interface User {
  id: string;
  name: string;
  email: string;
  city?: string;
  mobile: string;
  createdOn: number;
  referralCode: string;
  status: 'active' | 'blocked';
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  filterForm!: FormGroup;
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      status: ['All'],
      query: [''],
      city: ['']
    });

    this.loadUsers();
    this.applyFilters();

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  loadUsers() {
    const data = localStorage.getItem('users');
    if (data) {
      this.users = JSON.parse(data);
    } else {
      this.users = this.getDemoUsers();
      this.saveUsers();
    }
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getDemoUsers(): User[] {
    return [
      { id: '1', name: 'George Harrison', email: 'george@mail.com', city: 'Delhi', mobile: '111113333', createdOn: 1654130400, referralCode: 'geo79052', status: 'active' },
      { id: '2', name: 'Rajat Singhal', email: 'rajatsinghal@gmail.com', city: 'Mumbai', mobile: '9417315855', createdOn: 1652502960, referralCode: 'raj21994', status: 'active' },
      { id: '3', name: 'William Den', email: 'williamden@gmail.com', city: 'Chennai', mobile: '400500600', createdOn: 1652884080, referralCode: 'wil68783', status: 'active' },
      { id: '4', name: 'Rohan Chatterjee', email: 'rohan@gmail.com', city: 'Pune', mobile: '369369369', createdOn: 1655111988, referralCode: 'roh37079', status: 'active' },
      // Add more entries as needed...
    ];
  }

  public applyFilters() {
    const { status, query, city } = this.filterForm.value;
    this.filteredUsers = this.users.filter(u => {
      const statusMatch = status === 'All' || u.status === status;
      const queryMatch = !query || [u.name, u.email, u.mobile].some(field => field?.toLowerCase().includes(query.toLowerCase()));
      const cityMatch = !city || city === 'All' || (u.city && u.city.toLowerCase() === city.toLowerCase());
      return statusMatch && queryMatch && cityMatch;
    });
  }

  toggleStatus(user: User) {
    user.status = user.status === 'active' ? 'blocked' : 'active';
    this.saveUsers();
    this.applyFilters();
  }

  editUser(user: User) {
    alert(`Edit User: ${user.name}`);
  }

  formatTimestamp(ts: number) {
    return new Date(ts * 1000).toLocaleString();
  }
}
