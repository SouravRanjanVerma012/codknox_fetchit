import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent {
  filterForm!: FormGroup;
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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
    // Load users from localStorage or use demo data
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
      { id: '1', name: 'John Doe', email: 'john@example.com', city: 'Delhi', mobile: '9876543210', createdOn: 1722500000, referralCode: 'REF123', status: 'active' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', city: 'Mumbai', mobile: '9123456780', createdOn: 1723000000, referralCode: 'REF456', status: 'blocked' },
      { id: '3', name: 'David Miller', email: 'david@example.com', city: 'Chennai', mobile: '9988776655', createdOn: 1723500000, referralCode: 'REF789', status: 'active' },
    ];
  }

  applyFilters() {
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
