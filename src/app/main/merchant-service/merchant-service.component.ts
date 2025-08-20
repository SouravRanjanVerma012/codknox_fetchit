import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

interface AuditLogEntry {
  createdBy: string;
  createdOn: number;
  address: string;
  city: string;
  merchantCategory: string;
  email: string;
  isDefaultTaxes: boolean;
}

interface Merchant {
  vendorId: string;
  name: string;
  email: string;
  password?: string;
  mobile: string;
  countryCode: string;
  cityName: string;
  merchantCategory: string;
  status: string;
  address: string;
  deliveryRadius: number;
  platformPercentage: number;
  vatCharge: number;
  serviceCharge: number;
  serviceTax: number;
  minimumAmount: number;
  insertDate: number;
  location: { coordinates: [number, number] };
  isDefaultTaxes: boolean;
  isDeliveryRadius: boolean;
  isPlatformFee: boolean;
  totalRatings: number;
  totalProducts: number;
  profilePic?: string;
  auditLogs?: AuditLogEntry[];
}

@Component({
  selector: 'app-merchant-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './merchant-service.component.html',
  styleUrls: ['./merchant-service.component.css']
})
export class MerchantServiceComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  merchantForm!: FormGroup;
  merchants: Merchant[] = [];
  selectedMerchant: Merchant | null = null;
  currentView: 'list' | 'add' | 'edit' = 'list';
  isSubmitting = false;

  imagePreview: string | null = null;

  longitude = 76.792;
  latitude = 30.734;

  showAuditModal = false;
  currentAuditLogs: AuditLogEntry[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadMerchants();
  }

  initForm(): void {
    this.merchantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      countryCode: ['+91', [Validators.required]],
      cityName: ['', [Validators.required]],
      merchantCategory: ['', [Validators.required]],
      status: ['active', [Validators.required]],
      address: ['', [Validators.required]],
      deliveryRadius: [0, [Validators.required, Validators.min(0)]],
      platformPercentage: [10, [Validators.required, Validators.min(0), Validators.max(100)]],
      vatCharge: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      serviceCharge: [0, [Validators.min(0)]],
      serviceTax: [0, [Validators.min(0)]],
      minimumAmount: [0, [Validators.required, Validators.min(0)]],
      isDefaultTaxes: [true],
      isDeliveryRadius: [true],
      isPlatformFee: [true]
    });
  }

  loadMerchants(): void {
    const data = localStorage.getItem('merchants');
    if (data) {
      this.merchants = JSON.parse(data);
    } else {
      this.merchants = this.getDemoMerchants();
      this.saveMerchants();
    }
  }

  // saveMerchants(): void {
  //   localStorage.setItem('merchants', JSON.stringify(this.merchants));
  // }

  getDemoMerchants(): Merchant[] {
    return [
      {
        vendorId: 'v001',
        name: 'Blinkit',
        email: 'blinkit@gmail.com',
        password: '',
        mobile: '9876543210',
        countryCode: '+91',
        cityName: 'Sahibzada Ajit Nagar',
        merchantCategory: 'GROCERY',
        status: 'active',
        address: 'Sector 1, Punjab',
        deliveryRadius: 10,
        platformPercentage: 10,
        vatCharge: 18,
        serviceCharge: 0,
        serviceTax: 1,
        minimumAmount: 100,
        insertDate: 1657939200,
        location: { coordinates: [this.longitude, this.latitude] },
        isDefaultTaxes: true,
        isDeliveryRadius: true,
        isPlatformFee: true,
        totalRatings: 10,
        totalProducts: 200,
        profilePic: '',
        auditLogs: [
          {
            createdBy: 'admin@d2d.com',
            createdOn: 1657942800,
            address: 'Sector 1, Punjab',
            city: 'Sahibzada Ajit Nagar',
            merchantCategory: 'GROCERY',
            email: 'blinkit@gmail.com',
            isDefaultTaxes: true
          }
        ]
      },
      // Add 9 more merchants with unique vendorId and varying names/email etc.
      {
        vendorId: 'v002',
        name: 'Groffers Store',
        email: 'groffsers123@gmail.com',
        password: '',
        mobile: '9876543211',
        countryCode: '+91',
        cityName: 'Sahibzada Ajit Nagar',
        merchantCategory: 'GROCERY',
        status: 'active',
        address: 'Sector 2, Punjab',
        deliveryRadius: 15,
        platformPercentage: 12,
        vatCharge: 18,
        serviceCharge: 0,
        serviceTax: 0,
        minimumAmount: 200,
        insertDate: 1657939201,
        location: { coordinates: [this.longitude + 0.01, this.latitude + 0.01] },
        isDefaultTaxes: true,
        isDeliveryRadius: true,
        isPlatformFee: true,
        totalRatings: 8,
        totalProducts: 150,
        profilePic: '',
        auditLogs: []
      },
      // ... Similarly add remaining demo merchants...
      {
        vendorId: 'v003',
        name: 'Pragat Store',
        email: 'pragat@gmail.com',
        password: '',
        mobile: '9876543212',
        countryCode: '+91',
        cityName: 'Chandigarh',
        merchantCategory: 'GROCERY',
        status: 'inactive',
        address: 'Sector 3, Chandigarh',
        deliveryRadius: 20,
        platformPercentage: 11,
        vatCharge: 18,
        serviceCharge: 2,
        serviceTax: 1,
        minimumAmount: 150,
        insertDate: 1657939202,
        location: { coordinates: [this.longitude + 0.02, this.latitude + 0.02] },
        isDefaultTaxes: false,
        isDeliveryRadius: false,
        isPlatformFee: false,
        totalRatings: 15,
        totalProducts: 300,
        profilePic: '',
        auditLogs: []
      },
      {
        vendorId: 'v004',
        name: 'Khurana Grocers',
        email: 'khurana@vendor.com',
        password: '',
        mobile: '9888888888',
        countryCode: '+91',
        cityName: 'Punjab',
        merchantCategory: 'BEVERAGES',
        status: 'active',
        address: 'Address 4',
        deliveryRadius: 25,
        platformPercentage: 10,
        vatCharge: 18,
        serviceCharge: 5,
        serviceTax: 2,
        minimumAmount: 100,
        insertDate: 1657939203,
        location: { coordinates: [this.longitude + 0.03, this.latitude + 0.03] },
        isDefaultTaxes: true,
        isDeliveryRadius: true,
        isPlatformFee: true,
        totalRatings: 5,
        totalProducts: 50,
        profilePic: '',
        auditLogs: []
      },
      {
        vendorId: 'v005',
        name: 'Super Store',
        email: 'superstore@vendor.com',
        password: '',
        mobile: '9999999999',
        countryCode: '+91',
        cityName: 'Delhi',
        merchantCategory: 'RETAIL',
        status: 'active',
        address: 'Address 5',
        deliveryRadius: 30,
        platformPercentage: 8,
        vatCharge: 10,
        serviceCharge: 3,
        serviceTax: 1,
        minimumAmount: 500,
        insertDate: 1657939204,
        location: { coordinates: [this.longitude + 0.04, this.latitude + 0.04] },
        isDefaultTaxes: true,
        isDeliveryRadius: true,
        isPlatformFee: true,
        totalRatings: 20,
        totalProducts: 400,
        profilePic: '',
        auditLogs: []
      },
      {
        vendorId: 'v006',
        name: 'Green Market',
        email: 'green@market.com',
        password: '',
        mobile: '9123456789',
        countryCode: '+91',
        cityName: 'Mumbai',
        merchantCategory: 'WHOLESALE',
        status: 'inactive',
        address: 'Address 6',
        deliveryRadius: 15,
        platformPercentage: 12,
        vatCharge: 18,
        serviceCharge: 0,
        serviceTax: 0,
        minimumAmount: 800,
        insertDate: 1657939205,
        location: { coordinates: [this.longitude + 0.05, this.latitude + 0.05] },
        isDefaultTaxes: false,
        isDeliveryRadius: false,
        isPlatformFee: false,
        totalRatings: 10,
        totalProducts: 100,
        profilePic: '',
        auditLogs: []
      },
      {
        vendorId: 'v007',
        name: 'Daily Needs',
        email: 'daily@needs.com',
        password: '',
        mobile: '9000000000',
        countryCode: '+91',
        cityName: 'Kolkata',
        merchantCategory: 'GROCERY',
        status: 'active',
        address: 'Address 7',
        deliveryRadius: 12,
        platformPercentage: 10,
        vatCharge: 18,
        serviceCharge: 1,
        serviceTax: 1,
        minimumAmount: 150,
        insertDate: 1657939206,
        location: { coordinates: [this.longitude + 0.06, this.latitude + 0.06] },
        isDefaultTaxes: true,
        isDeliveryRadius: true,
        isPlatformFee: true,
        totalRatings: 25,
        totalProducts: 120,
        profilePic: '',
        auditLogs: []
      },
      {
        vendorId: 'v008',
        name: 'Express Mart',
        email: 'express@mart.com',
        password: '',
        mobile: '9111111111',
        countryCode: '+91',
        cityName: 'Bangalore',
        merchantCategory: 'RETAIL',
        status: 'inactive',
        address: 'Address 8',
        deliveryRadius: 18,
        platformPercentage: 9,
        vatCharge: 18,
        serviceCharge: 2,
        serviceTax: 1,
        minimumAmount: 200,
        insertDate: 1657939207,
        location: { coordinates: [this.longitude + 0.07, this.latitude + 0.07] },
        isDefaultTaxes: false,
        isDeliveryRadius: false,
        isPlatformFee: false,
        totalRatings: 30,
        totalProducts: 150,
        profilePic: '',
        auditLogs: []
      },
      {
        vendorId: 'v009',
        name: 'City Shop',
        email: 'city@shop.com',
        password: '',
        mobile: '9222222222',
        countryCode: '+91',
        cityName: 'Chennai',
        merchantCategory: 'BEVERAGES',
        status: 'active',
        address: 'Address 9',
        deliveryRadius: 10,
        platformPercentage: 11,
        vatCharge: 18,
        serviceCharge: 2,
        serviceTax: 1,
        minimumAmount: 250,
        insertDate: 1657939208,
        location: { coordinates: [this.longitude + 0.08, this.latitude + 0.08] },
        isDefaultTaxes: true,
        isDeliveryRadius: true,
        isPlatformFee: true,
        totalRatings: 40,
        totalProducts: 200,
        profilePic: '',
        auditLogs: []
      },
      {
        vendorId: 'v010',
        name: 'Quick Basket',
        email: 'quick@basket.com',
        password: '',
        mobile: '9333333333',
        countryCode: '+91',
        cityName: 'Hyderabad',
        merchantCategory: 'WHOLESALE',
        status: 'active',
        address: 'Address 10',
        deliveryRadius: 15,
        platformPercentage: 8,
        vatCharge: 18,
        serviceCharge: 3,
        serviceTax: 1,
        minimumAmount: 300,
        insertDate: 1657939209,
        location: { coordinates: [this.longitude + 0.09, this.latitude + 0.09] },
        isDefaultTaxes: true,
        isDeliveryRadius: true,
        isPlatformFee: true,
        totalRatings: 22,
        totalProducts: 180,
        profilePic: '',
        auditLogs: []
      }
    ];
  }

  saveMerchants(): void {
    localStorage.setItem('merchants', JSON.stringify(this.merchants));
  }

  addMerchant(): void {
    this.currentView = 'add';
    this.selectedMerchant = null;
    this.resetForm();
  }

  editMerchant(merchant: Merchant): void {
    this.currentView = 'edit';
    this.selectedMerchant = merchant;
    this.imagePreview = merchant.profilePic || null;
    this.merchantForm.patchValue({
      name: merchant.name,
      email: merchant.email,
      password: '',
      mobile: merchant.mobile,
      countryCode: merchant.countryCode,
      cityName: merchant.cityName,
      merchantCategory: merchant.merchantCategory,
      status: merchant.status,
      address: merchant.address,
      deliveryRadius: merchant.deliveryRadius,
      platformPercentage: merchant.platformPercentage,
      vatCharge: merchant.vatCharge,
      serviceCharge: merchant.serviceCharge,
      serviceTax: merchant.serviceTax,
      minimumAmount: merchant.minimumAmount,
      isDefaultTaxes: merchant.isDefaultTaxes,
      isDeliveryRadius: merchant.isDeliveryRadius,
      isPlatformFee: merchant.isPlatformFee
    });
  }

  deleteMerchant(merchant: Merchant): void {
    if (confirm(`Are you sure you want to delete ${merchant.name}?`)) {
      this.merchants = this.merchants.filter(m => m.vendorId !== merchant.vendorId);
      this.saveMerchants();
      alert('Merchant deleted successfully');
      if (this.currentView !== 'list') {
        this.currentView = 'list';
        this.resetForm();
      }
    }
  }

  saveMerchant(): void {
    if (this.merchantForm.invalid) {
      this.markFormGroupTouched(this.merchantForm);
      return;
    }
    this.isSubmitting = true;
    const formValue = this.merchantForm.value;

    if (this.currentView === 'add') {
      const newId = 'v' + (this.merchants.length + 1).toString().padStart(3, '0');
      const newMerchant = {
        ...formValue,
        vendorId: newId,
        insertDate: Math.floor(Date.now() / 1000),
        location: { coordinates: [this.longitude, this.latitude] },
        totalRatings: 0,
        totalProducts: 0,
        profilePic: this.imagePreview || '',
        auditLogs: [
          {
            createdBy: 'admin@domain.com',
            createdOn: Math.floor(Date.now() / 1000),
            address: formValue.address,
            city: formValue.cityName,
            merchantCategory: formValue.merchantCategory,
            email: formValue.email,
            isDefaultTaxes: formValue.isDefaultTaxes
          }
        ]
      };
      this.merchants.push(newMerchant);
      alert('Merchant added successfully');
    } else if (this.currentView === 'edit' && this.selectedMerchant) {
      Object.assign(this.selectedMerchant, formValue);
      this.selectedMerchant.profilePic = this.imagePreview || this.selectedMerchant.profilePic;
      this.selectedMerchant.insertDate = this.selectedMerchant.insertDate || Math.floor(Date.now() / 1000);
      this.selectedMerchant.auditLogs = this.selectedMerchant.auditLogs || [];
      this.selectedMerchant.auditLogs.push({
        createdBy: 'admin@domain.com',
        createdOn: Math.floor(Date.now() / 1000),
        address: formValue.address,
        city: formValue.cityName,
        merchantCategory: formValue.merchantCategory,
        email: formValue.email,
        isDefaultTaxes: formValue.isDefaultTaxes
      });
      alert('Merchant updated successfully');
    }
    this.saveMerchants();
    this.isSubmitting = false;
    this.currentView = 'list';
    this.resetForm();
  }

  toggleStatus(merchant: Merchant): void {
    merchant.status = merchant.status === 'active' ? 'inactive' : 'active';
    this.saveMerchants();
    alert(`Merchant is now ${merchant.status}`);
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => control.markAsTouched());
  }

  resetForm(): void {
    this.merchantForm.reset();
    this.selectedMerchant = null;
    this.imagePreview = null;
    this.merchantForm.patchValue({
      countryCode: '+91',
      deliveryRadius: 0,
      platformPercentage: 10,
      vatCharge: 0,
      serviceCharge: 0,
      serviceTax: 0,
      minimumAmount: 0,
      status: 'active',
      isDefaultTaxes: true,
      isDeliveryRadius: true,
      isPlatformFee: true
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(file);
  }

  view(): void {
    this.currentView = 'list';
  }

  // // Audit modal variables and methods
  // showAuditModal = false;
  // currentAuditLogs: AuditLogEntry[] = [];

  openAuditModal(merchant: Merchant): void {
    this.currentAuditLogs = merchant.auditLogs || [];
    this.showAuditModal = true;
  }

  closeAuditModal(): void {
    this.showAuditModal = false;
    this.currentAuditLogs = [];
  }
}
