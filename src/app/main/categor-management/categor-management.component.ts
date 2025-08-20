import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  icon: string;      // base64 or image url
  banner: string;    // base64 or image url
}

@Component({
  selector: 'app-categor-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './categor-management.component.html',
  styleUrls: ['./categor-management.component.css'],
})
export class CategorManagementComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;

  showModal = false;
  isEdit = false;
  showImageModal = false;
  imageToView: string | null = null;
  isBannerView = false;

  showDeleteModal = false;
  deletingCategory: Category | null = null;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCategories();

    this.form = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      banner: ['', Validators.required],
    });
  }

  loadCategories() {
    const data = localStorage.getItem('categories');
    if (data) {
      this.categories = JSON.parse(data);
    } else {
      this.categories = [
        {
          id: 1,
          name: 'GROCERY',
          icon: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
          banner: 'https://5.imimg.com/data5/SELLER/Default/2022/11/SD/MQ/RX/4090677/grocery-items-500x500.jpg',
        },
        {
          id: 2,
          name: 'BEVERAGES',
          icon: 'https://cdn-icons-png.flaticon.com/512/2917/2917762.png',
          banner: 'https://img.freepik.com/free-photo/refreshing-fruit-drinks-with-ice_114579-4842.jpg',
        },
        {
          id: 3,
          name: 'GROOMING',
          icon: 'https://cdn-icons-png.flaticon.com/512/1248/1248285.png',
          banner: 'https://images.news18.com/ibnlive/uploads/2022/07/grooming-166006037316x9.jpg',
        },
      ];
      this.saveCategories();
    }
  }

  saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  openAddModal() {
    this.showModal = true;
    this.isEdit = false;
    this.selectedCategory = null;
    this.form.reset();
  }

  openEditModal(category: Category) {
    this.showModal = true;
    this.isEdit = true;
    this.selectedCategory = category;
    this.form.patchValue({
      name: category.name,
      icon: category.icon,
      banner: category.banner,
    });
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const val = this.form.value;
    if (this.isEdit && this.selectedCategory) {
      const idx = this.categories.findIndex((c) => c.id === this.selectedCategory!.id);
      this.categories[idx] = { id: this.selectedCategory!.id, ...val };
    } else {
      this.categories.push({ id: Date.now(), ...val });
    }
    this.saveCategories();
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.form.reset();
    this.selectedCategory = null;
  }

  showImage(img: string, isBanner: boolean = false) {
    this.imageToView = img;
    this.isBannerView = isBanner;
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
    this.imageToView = null;
    this.isBannerView = false;
  }

  confirmDelete(category: Category) {
    this.showDeleteModal = true;
    this.deletingCategory = category;
  }

  performDelete() {
    if (this.deletingCategory) {
      this.categories = this.categories.filter((c) => c.id !== this.deletingCategory!.id);
      this.saveCategories();
    }
    this.closeDeleteModal();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deletingCategory = null;
  }

  onIconFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({ icon: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onBannerFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({ banner: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
