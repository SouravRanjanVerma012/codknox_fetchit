import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MerchantRow {
  id: number;
  name: string;
  email: string;
  city?: string;
  mobile?: string;
  createdOn?: Date;
  status?: 'active' | 'inactive';
  referralCode?: string;
}

interface Invoice {
  id: number;
  date: Date;
  amount: number;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- DatePipe here fixes the pipe error
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent {
  filterStatus: string = '';

  merchants: MerchantRow[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', city: 'Delhi', mobile: '9876543210', createdOn: new Date('2025-08-01'), status: 'active', referralCode: 'REF123' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', city: 'Mumbai', mobile: '9123456780', createdOn: new Date('2025-08-05'), status: 'inactive', referralCode: 'REF456' },
    { id: 3, name: 'David Miller', email: 'david@example.com', city: 'Chennai', mobile: '9988776655', createdOn: new Date('2025-08-12'), status: 'active', referralCode: 'REF789' },
  ];

  storeInvoices: Invoice[] = [
    { id: 101, date: new Date('2025-08-01'), amount: 1200 },
    { id: 102, date: new Date('2025-08-05'), amount: 800 },
    { id: 103, date: new Date('2025-08-12'), amount: 1500 },
  ];

  get filteredMerchants() {
    if (!this.filterStatus) return this.merchants;
    return this.merchants.filter(m => m.status === this.filterStatus);
  }

  toggleStatus(m: MerchantRow) {
    if (!m.status) return;
    m.status = m.status === 'active' ? 'inactive' : 'active';
  }
}
