import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface OrderProduct {
  title: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  orderNo: number;
  vendorName: string;
  userName: string;
  userAddress: string;
  creationDate: number;   // unix timestamp seconds
  orderType: string;
  userMobile: string;
  paymentMode: string;
  referenceId: string;
  orderStatus: string;
  driverAssigned: string;
  cancelDriver: string;
  products: OrderProduct[];
  summary: {
    subTotal: number;
    couponDiscount: string;
    couponType: string;
    referralDiscount: string;
    deliveryFees: string;
    gstCharges: string;
    packagingCharges: string;
    totalPrice: number;
    adminShare: number;
  };
  vendorAddress: string;
  userEmail: string;
}

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css'],
})
export class OrderManagementComponent {
  filterForm: FormGroup;
  orders: Order[] = [];
  filtered: Order[] = [];
  modalOrder: Order | null = null;
  showDetailModal = false;
  showMapModal = false;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      status: ['All'],
      orderNo: [''],
      mobileUser: [''],
      from: [''],
      to: [''],
    });
    this.loadOrders();
    this.applyFilters();

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  loadOrders() {
    const stored = localStorage.getItem('orders');
    if (stored) {
      this.orders = JSON.parse(stored);
    } else {
      this.orders = this.demoOrders();
      localStorage.setItem('orders', JSON.stringify(this.orders));
    }
  }

  demoOrders(): Order[] {
    // Here's a sample of demo orders; tailor as needed for more.
    return [
      {
        orderNo: 145,
        vendorName: 'Khurana Grocers',
        vendorAddress: 'Plot D, 188, Cheema Chowk, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 160071, India',
        userName: 'Alfred',
        userEmail: 'alfrednova@gmail.com',
        userAddress: '25D Sahibzada Ajit Singh Nagar',
        creationDate: 1759719000,
        orderType: '--',
        userMobile: '3004005001',
        paymentMode: 'COD',
        referenceId: '--',
        orderStatus: 'DELIVERED',
        driverAssigned: 'Gaganpreet Singh',
        cancelDriver: '--',
        products: [
          { title: 'Shakti Chakki Atta', quantity: 3, price: 72, total: 216 },
          { title: 'milk', quantity: 5, price: 30, total: 150 }
        ],
        summary: {
          subTotal: 366,
          couponDiscount: 'No coupon applied',
          couponType: 'No coupon applied',
          referralDiscount: '--',
          deliveryFees: '--',
          gstCharges: '--',
          packagingCharges: '₹ 20.00',
          totalPrice: 391,
          adminShare: 5
        }
      },
      {
        orderNo: 144,
        vendorName: 'Cloud 9',
        vendorAddress: '2347 2347, near Paragon school, Sector 71, Sahibzada Ajit Singh Nagar, Punjab 160071, India',
        userName: 'max',
        userEmail: '',
        userAddress: '',
        creationDate: 1759684860,
        orderType: '--',
        userMobile: '1111122222',
        paymentMode: 'COD',
        referenceId: '--',
        orderStatus: 'DELIVERED',
        driverAssigned: 'Rajesh Kumar',
        cancelDriver: '--',
        products: [],
        summary: {
          subTotal: 0,
          couponDiscount: '--',
          couponType: '--',
          referralDiscount: '--',
          deliveryFees: '--',
          gstCharges: '--',
          packagingCharges: '--',
          totalPrice: 0,
          adminShare: 0
        }
      },
      // Add more similar orders...
    ];
  }

  applyFilters() {
    const { status, orderNo, mobileUser, from, to } = this.filterForm.value;
    let filtered = [...this.orders];

    if (status && status !== 'All') filtered = filtered.filter(o => o.orderStatus === status);
    if (orderNo) filtered = filtered.filter(o => o.orderNo.toString().includes(orderNo));
    if (mobileUser) filtered = filtered.filter(o =>
      (o.userMobile && o.userMobile.includes(mobileUser)) ||
      (o.userName && o.userName.toLowerCase().includes(mobileUser.toLowerCase()))
    );
    if (from) {
      const fromDate = new Date(from).setHours(0,0,0,0)/1000;
      filtered = filtered.filter(o => o.creationDate >= fromDate);
    }
    if (to) {
      const toDate = new Date(to).setHours(23,59,59,999)/1000;
      filtered = filtered.filter(o => o.creationDate <= toDate);
    }
    this.filtered = filtered;
  }

  formatDate(ts: number) {
    return new Date(ts * 1000).toLocaleString();
  }

  openDetail(order: Order) {
    this.modalOrder = order;
    this.showDetailModal = true;
  }

  closeDetail() {
    this.showDetailModal = false;
    this.modalOrder = null;
  }

  openMap() {
    this.showMapModal = true;
  }

  closeMap() {
    this.showMapModal = false;
  }
}
