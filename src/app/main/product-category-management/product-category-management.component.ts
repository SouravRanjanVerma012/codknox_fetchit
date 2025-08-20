import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

interface ProductCategory {
  id: number;
  storeCategory: string; // e.g., 'GROCERY', 'BEVERAGES', etc.
  name: string;
  icon: string; // base64 image or URL
}

@Component({
  selector: 'app-product-category-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-category-management.component.html',
  styleUrls: ['./product-category-management.component.css'],
})
export class ProductCategoryManagementComponent implements OnInit {
  categories: ProductCategory[] = [];
  filteredCategories: ProductCategory[] = [];
  
  storeCategories = ['GROCERY', 'BEVERAGES', 'GROOMING'];

  form!: FormGroup;
  filterForm!: FormGroup;

  showFormModal = false;
  showImageModal = false;
  imageToShow: string | null = null;

  editingCategory: ProductCategory | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      searchStoreCategory: [''],
      searchName: [''],
    });

    this.form = this.fb.group({
      storeCategory: ['', Validators.required],
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });

    this.loadCategories();
    this.applyFilters();

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  loadCategories(): void {
    const data = localStorage.getItem('productCategories');
    if (data) {
      this.categories = JSON.parse(data);
    } else {
      this.categories = this.getDemoCategories();
      this.saveCategories();
    }
    this.filteredCategories = [...this.categories];
  }

  saveCategories(): void {
    localStorage.setItem('productCategories', JSON.stringify(this.categories));
  }

  getDemoCategories(): ProductCategory[] {
    return [
      {
        id: 1,
        storeCategory: 'GROCERY',
        name: 'Dairy Products',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Dairy_products.jpg',
      },
      {
        id: 2,
        storeCategory: '',
        name: 'Other',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Generic_product_icon.png',
      },
      {
        id: 3,
        storeCategory: 'BEVERAGES',
        name: 'Energy Drinks',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Assorted_energy_drinks_2010-09-16.jpg',
      },
    ];
  }

  applyFilters(): void {
    const { searchStoreCategory, searchName } = this.filterForm.value;
    this.filteredCategories = this.categories.filter(cat => {
      const matchesCategory =
        !searchStoreCategory || cat.storeCategory.toLowerCase().includes(searchStoreCategory.toLowerCase());
      const matchesName =
        !searchName || cat.name.toLowerCase().includes(searchName.toLowerCase());
      return matchesCategory && matchesName;
    });
  }

  openAddForm(): void {
    this.editingCategory = null;
    this.form.reset();
    this.showFormModal = true;
  }

  openEditForm(category: ProductCategory): void {
    this.editingCategory = category;
    this.form.patchValue({
      storeCategory: category.storeCategory,
      name: category.name,
      icon: category.icon,
    });
    this.showFormModal = true;
  }

  saveForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.editingCategory) {
      // Update existing
      const index = this.categories.findIndex(c => c.id === this.editingCategory!.id);
      this.categories[index] = {
        ...this.editingCategory,
        storeCategory: formValue.storeCategory,
        name: formValue.name,
        icon: formValue.icon,
      };
    } else {
      // Add new
      const newCategory: ProductCategory = {
        id: Date.now(),
        storeCategory: formValue.storeCategory,
        name: formValue.name,
        icon: formValue.icon,
      };
      this.categories.push(newCategory);
    }

    this.saveCategories();
    this.applyFilters();
    this.closeForm();
  }

  closeForm(): void {
    this.showFormModal = false;
    this.editingCategory = null;
    this.form.reset();
  }

  deleteCategory(category: ProductCategory): void {
    if (confirm(`Are you sure you want to delete category "${category.name}"?`)) {
      this.categories = this.categories.filter(c => c.id !== category.id);
      this.saveCategories();
      this.applyFilters();
    }
  }

  onIconSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.form.patchValue({ icon: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  showImage(image: string): void {
    this.imageToShow = image;
    this.showImageModal = true;
  }

  closeImageModal(): void {
    this.showImageModal = false;
    this.imageToShow = null;
  }
}
