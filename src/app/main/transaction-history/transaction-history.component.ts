import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import html2pdf from 'html2pdf.js';

interface Transaction {
  orderNumber: string;
  driverName: string;
  paymentMethod: string;
  creationDate: number;    // Unix timestamp seconds
  orderAmount: number;
  deliveryTip: number;
  payoutStatus: string;
  vendorShare: number;
  driverShare: number;
  couponType: string;
  d2dShare: number;
  gst: number;
  invoiceStatus: 'success' | 'failure' | string;
}

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent implements OnInit {
  filterForm!: FormGroup;
  transactions: Transaction[] = [];
  filtered: Transaction[] = [];

  selectedTransaction: Transaction | any  = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      orderNumber: [''],
      driverName: [''],
      from: [''],
      to: [''],
    });

    this.loadTransactions();
    this.filtered = [...this.transactions];

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  loadTransactions() {
    const data = localStorage.getItem('transactions');

    if (data) {
      this.transactions = JSON.parse(data);
    } else {
      // Sample demo data with no null/undefined values
      this.transactions = [
        {
          orderNumber: 'TX10001',
          driverName: 'Alice Smith',
          paymentMethod: 'Credit Card',
          creationDate: 1682000000,
          orderAmount: 2500,
          deliveryTip: 100,
          payoutStatus: 'Paid',
          vendorShare: 2000,
          driverShare: 300,
          couponType: 'fixed',
          d2dShare: 200,
          gst: 100,
          invoiceStatus: 'success',
        },
        {
          orderNumber: 'TX10002',
          driverName: 'Bob Johnson',
          paymentMethod: 'COD',
          creationDate: 1682086400,
          orderAmount: 1800,
          deliveryTip: 50,
          payoutStatus: 'Pending',
          vendorShare: 1600,
          driverShare: 100,
          couponType: 'percentage',
          d2dShare: 150,
          gst: 75,
          invoiceStatus: 'success',
        },
        {
          orderNumber: 'TX10003',
          driverName: 'Charlie Davis',
          paymentMethod: 'UPI',
          creationDate: 1682172800,
          orderAmount: 3200,
          deliveryTip: 0,
          payoutStatus: 'Paid',
          vendorShare: 2800,
          driverShare: 250,
          couponType: 'none',
          d2dShare: 300,
          gst: 150,
          invoiceStatus: 'failure',
        },
        {
          orderNumber: 'TX10004',
          driverName: 'Diana Evans',
          paymentMethod: 'Debit Card',
          creationDate: 1682259200,
          orderAmount: 4000,
          deliveryTip: 120,
          payoutStatus: 'Paid',
          vendorShare: 3500,
          driverShare: 350,
          couponType: 'percentage',
          d2dShare: 280,
          gst: 200,
          invoiceStatus: 'success',
        },
      ];

      this.saveTransactions();
    }
  }

  saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  applyFilters() {
    const { orderNumber, driverName, from, to } = this.filterForm.value;

    let list = [...this.transactions];

    if (orderNumber) {
      list = list.filter(tx => tx.orderNumber.includes(orderNumber));
    }

    if (driverName) {
      list = list.filter(tx => tx.driverName.toLowerCase().includes(driverName.toLowerCase()));
    }

    if (from) {
      const fromTs = new Date(from).setHours(0, 0, 0, 0) / 1000;
      list = list.filter(tx => tx.creationDate >= fromTs);
    }

    if (to) {
      const toTs = new Date(to).setHours(23, 59, 59, 999) / 1000;
      list = list.filter(tx => tx.creationDate <= toTs);
    }

    this.filtered = list;
  }

  formatDate(ts: number): string {
    if (!ts) return '';
    return new Date(ts * 1000).toLocaleString();
  }

  formatMoney(amount: number): string {
    if (amount == null) return '-';
    return '₹' + amount.toFixed(2);
  }

  selectTransaction(tx: Transaction) {
    this.selectedTransaction = tx;
  }

  clearSelectedTransaction() {
    this.selectedTransaction = null;
  }

  downloadCSV() {
  if (this.filtered.length === 0) {
    alert('No transactions to export');
    return;
  }

  const headers = [
    'Order Number', 'Driver Name', 'Payment Method', 'Creation Date',
    'Order Amount', 'Delivery Tip', 'Payout Status',
    'Vendor Share', 'Driver Share', 'Coupon Type',
    'D2D Share', 'GST', 'Invoice Status',
  ];

  const csvRows = this.filtered.map(tx => [
    tx.orderNumber,
    tx.driverName,
    tx.paymentMethod,
    this.formatDate(tx.creationDate),
    tx.orderAmount != null ? tx.orderAmount.toFixed(2) : '0.00', // Check for null
    tx.deliveryTip != null ? tx.deliveryTip.toFixed(2) : '0.00', // Check for null
    tx.payoutStatus,
    tx.vendorShare != null ? tx.vendorShare.toFixed(2) : '0.00', // Check for null
    tx.driverShare != null ? tx.driverShare.toString() : '0', // Check for null
    tx.couponType,
    tx.d2dShare != null ? tx.d2dShare.toFixed(2) : '0.00', // Check for null
    tx.gst != null ? tx.gst.toString() : '0', // Check for null
    tx.invoiceStatus,
  ]);

  let csvContent = headers.join(',') + '\n';
  csvContent += csvRows.map(row => row.map(item => `"${item}"`).join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `transactions_${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

exportPDF() {
  if (!this.selectedTransaction) {
    alert('Select a transaction first to download invoice.');
    return;
  }

  const element = document.getElementById('invoice-template');
  if (!element) {
    alert('Invoice template not found');
    return;
  }

  // Make the element visible for PDF generation
  element.style.display = 'block';
  
  const options = {
    margin: 0.5,
    filename: `Invoice_${this.selectedTransaction.orderNumber}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  };

  html2pdf(element, options).then(() => {
    // Hide the element again after PDF generation
    element.style.display = 'none';
  });
}


}
