import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

interface Banner {
  id: number;
  image: string; // base64 or URL
}

@Component({
  selector: 'app-banner-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './banner-management.component.html',
  styleUrls: ['./banner-management.component.css'],
})
export class BannerManagementComponent implements OnInit {
  banners: Banner[] = [];
  form!: FormGroup;
  showModal = false;
  editingBanner: Banner | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadBanners();
    this.form = this.fb.group({
      image: ['', Validators.required],
    });
  }

  loadBanners(): void {
    const data = localStorage.getItem('banners');
    if (data) {
      this.banners = JSON.parse(data);
    } else {
      this.banners = [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Sample banner image
        },
      ];
      this.saveBanners();
    }
  }

  saveBanners(): void {
    localStorage.setItem('banners', JSON.stringify(this.banners));
  }

  openAddModal(): void {
    this.showModal = true;
    this.editingBanner = null;
    this.form.reset();
  }

  openEditModal(banner: Banner): void {
    this.editingBanner = banner;
    this.form.reset();
    this.form.patchValue({ image: banner.image });
    this.showModal = true;
  }

  saveBanner(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const val = this.form.value;
    if (this.editingBanner) {
      // Update
      const index = this.banners.findIndex(b => b.id === this.editingBanner!.id);
      this.banners[index] = { ...this.editingBanner, image: val.image };
    } else {
      // Add new
      const newBanner: Banner = {
        id: Date.now(),
        image: val.image,
      };
      this.banners.push(newBanner);
    }
    this.saveBanners();
    this.closeModal();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.form.patchValue({ image: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  deleteBanner(banner: Banner): void {
    if (confirm('Are you sure you want to delete this banner?')) {
      this.banners = this.banners.filter(b => b.id !== banner.id);
      this.saveBanners();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.editingBanner = null;
    this.form.reset();
  }
}
