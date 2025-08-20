import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

interface Coupon {
  id: number;
  code: string;
  description: string;
  createdOn: number;
  createdBy?: string;
  couponType: string;
  storeType: string;
  createdFor: string;
  minOrderPrice: number;
  startTime: number;
  endTime: number;
  maxRedemption: number | string;
  redemptionCount: number;
  perUser: number;
  perUserLimit: number;
  discountType: 'percentage' | 'fixed';
  percentageValue?: number | null;
  fixedValue?: number | null;
  status: 'active' | 'inactive';
  isFirstOrder: boolean;
  isDisabled?: boolean;
}

@Component({
  selector: 'app-promo-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './promo-management.component.html',
  styleUrls: ['./promo-management.component.css'],
})
export class PromoManagementComponent implements OnInit {
  filterForm!: FormGroup;
  form!: FormGroup;
  coupons: Coupon[] = [];
  filteredCoupons: Coupon[] = [];
  storeTypes = ['GROCERY', 'BEVERAGES', 'RETAIL'];
  showForm = false;
  editingCoupon: Coupon | null = null;
  showAuditModal = false;
  selectedAudit: Coupon | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      status: ['Active'],
      type: ['All'],
      code: [''],
      from: [''],
      to: [''],
    });

    this.form = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      storeType: ['', Validators.required],
      createdFor: ['', Validators.required],
      minOrderPrice: [1, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      discountType: ['percentage', Validators.required],
      percentageValue: [{ value: null, disabled: false }, [Validators.min(1), Validators.max(100)]],
      fixedValue: [{ value: null, disabled: true }, Validators.min(1)],
      maxRedemption: [1, [Validators.required, Validators.min(0)]],
      perUserLimit: [1, [Validators.required, Validators.min(1)]],
      isFirstOrder: [false],
    });

    this.form.get('discountType')?.valueChanges.subscribe(val => {
      if (val === 'percentage') {
        this.form.get('percentageValue')?.enable();
        this.form.get('fixedValue')?.disable();
        this.form.get('fixedValue')?.setValue(null);
      } else {
        this.form.get('percentageValue')?.disable();
        this.form.get('fixedValue')?.enable();
        this.form.get('percentageValue')?.setValue(null);
      }
    });

    this.loadCoupons();
    this.applyFilters();

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  loadCoupons(): void {
    const data = localStorage.getItem('coupons');
    if (data) {
      this.coupons = JSON.parse(data);
    } else {
      this.coupons = this.getDemoCoupons();
      this.saveCoupons();
    }
  }

  saveCoupons(): void {
    localStorage.setItem('coupons', JSON.stringify(this.coupons));
  }

  getDemoCoupons(): Coupon[] {
    return [
      {
        id: 1,
        code: 'NEWUSER101',
        description: '10% discount for new users',
        createdOn: 1745721615,
        couponType: 'coupon',
        storeType: 'GROCERY',
        createdFor: 'PK General Store',
        minOrderPrice: 1000,
        startTime: 1745721600,
        endTime: 1745894400,
        maxRedemption: 1,
        redemptionCount: 1,
        perUser: 1,
        perUserLimit: 1,
        discountType: 'percentage',
        percentageValue: 10,
        fixedValue: null,
        status: 'active',
        isFirstOrder: true,
        isDisabled: false,
      },
      {
        id: 2,
        code: 'KHURANA60',
        description: '60rs discount on minimum 160',
        createdOn: 1745529635,
        couponType: 'coupon',
        storeType: 'GROCERY',
        createdFor: 'Khurana Grocers',
        minOrderPrice: 160,
        startTime: 1745529600,
        endTime: 1745721600,
        maxRedemption: 5,
        redemptionCount: 2,
        perUser: 1,
        perUserLimit: 1,
        discountType: 'fixed',
        percentageValue: null,
        fixedValue: 60,
        status: 'active',
        isFirstOrder: false,
        isDisabled: false,
      },
    ];
  }

  applyFilters(): void {
    const { status, type, code, from, to } = this.filterForm.value;
    let list = [...this.coupons];

    if (status && status !== 'All')
      list = list.filter(c => c.status.toLowerCase() === status.toLowerCase());

    if (type && type !== 'All')
      list = list.filter(c => c.couponType === type);

    if (code)
      list = list.filter(c => c.code.toLowerCase().includes(code.toLowerCase()));

    if (from) {
      const fromDate = new Date(from).setHours(0, 0, 0, 0) / 1000;
      list = list.filter(c => c.startTime >= fromDate);
    }
    if (to) {
      const toDate = new Date(to).setHours(23, 59, 59, 999) / 1000;
      list = list.filter(c => c.endTime <= toDate);
    }

    this.filteredCoupons = list;
  }

  showAddForm(): void {
    this.showForm = true;
    this.editingCoupon = null;
    this.form.reset();
    this.form.patchValue({
      discountType: 'percentage',
      minOrderPrice: 1,
      perUserLimit: 1,
      maxRedemption: 1,
      isFirstOrder: false,
    });
  }

  showEditForm(coupon: Coupon): void {
    this.showForm = true;
    this.editingCoupon = coupon;
    this.form.patchValue({
      code: coupon.code,
      description: coupon.description,
      storeType: coupon.storeType,
      createdFor: coupon.createdFor,
      minOrderPrice: coupon.minOrderPrice,
      startTime: new Date(coupon.startTime * 1000).toISOString().slice(0, 10),
      endTime: new Date(coupon.endTime * 1000).toISOString().slice(0, 10),
      discountType: coupon.discountType,
      percentageValue: coupon.percentageValue,
      fixedValue: coupon.fixedValue,
      maxRedemption: coupon.maxRedemption,
      perUserLimit: coupon.perUserLimit,
      isFirstOrder: coupon.isFirstOrder,
    });

    if (coupon.discountType === 'percentage') {
      this.form.get('percentageValue')?.enable();
      this.form.get('fixedValue')?.disable();
    } else {
      this.form.get('percentageValue')?.disable();
      this.form.get('fixedValue')?.enable();
    }
  }

  saveCoupon(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const val = this.form.value;

    const coupon: Coupon = {
      id: this.editingCoupon ? this.editingCoupon.id : Date.now(),
      code: val.code,
      description: val.description,
      couponType: 'coupon',
      storeType: val.storeType,
      createdFor: val.createdFor,
      minOrderPrice: val.minOrderPrice,
      startTime: Math.floor(new Date(val.startTime).getTime() / 1000),
      endTime: Math.floor(new Date(val.endTime).getTime() / 1000),
      maxRedemption: val.maxRedemption,
      redemptionCount: this.editingCoupon ? this.editingCoupon.redemptionCount : 0,
      perUser: val.perUserLimit,
      perUserLimit: val.perUserLimit,
      discountType: val.discountType,
      percentageValue: val.discountType === 'percentage' ? val.percentageValue : null,
      fixedValue: val.discountType === 'fixed' ? val.fixedValue : null,
      status: this.editingCoupon ? this.editingCoupon.status : 'active',
      isFirstOrder: val.isFirstOrder,
      isDisabled: false,
      createdOn: this.editingCoupon ? this.editingCoupon.createdOn : Math.floor(Date.now() / 1000),
    };

    if (this.editingCoupon) {
      const index = this.coupons.findIndex(c => c.id === this.editingCoupon!.id);
      this.coupons[index] = coupon;
    } else {
      this.coupons.push(coupon);
    }

    this.saveCoupons();
    this.applyFilters();
    this.showForm = false;
    this.editingCoupon = null;
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingCoupon = null;
  }

  deleteCoupon(coupon: Coupon): void {
    if (confirm(`Are you sure you want to delete coupon "${coupon.code}"?`)) {
      this.coupons = this.coupons.filter(c => c.id !== coupon.id);
      this.saveCoupons();
      this.applyFilters();
    }
  }

  disableCoupon(coupon: Coupon): void {
    coupon.status = 'inactive';
    coupon.isDisabled = true;
    this.saveCoupons();
    this.applyFilters();
  }

  enableCoupon(coupon: Coupon): void {
    coupon.status = 'active';
    coupon.isDisabled = false;
    this.saveCoupons();
    this.applyFilters();
  }

  openAuditLog(coupon: Coupon): void {
    this.selectedAudit = coupon;
    this.showAuditModal = true;
  }

  closeAuditLog(): void {
    this.selectedAudit = null;
    this.showAuditModal = false;
  }

  formatDate(unixSeconds: number): string {
    if (!unixSeconds) return '';
    return new Date(unixSeconds * 1000).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  short(str: string, length = 20): string {
    if (!str) return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
  }
}
