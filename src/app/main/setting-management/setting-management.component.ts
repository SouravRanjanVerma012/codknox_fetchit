import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

interface PolicyDoc {
  type: 'terms' | 'privacy' | 'about';
  label: string;
  pdfData?: string;     // base64 string of PDF
  filename?: string;
}

@Component({
  selector: 'app-setting-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './setting-management.component.html',
  styleUrls: ['./setting-management.component.css']
})
export class SettingManagementComponent {
  docs: PolicyDoc[] = [
    { type: 'terms', label: 'Terms and Conditions (User)' },
    { type: 'privacy', label: 'Privacy Policy (User)' },
    { type: 'about', label: 'About Us (User)' }
  ];
  selectedType: 'terms' | 'privacy' | 'about' = 'terms';
  get selectedDoc(): PolicyDoc {
    return this.docs.find(d => d.type === this.selectedType)!;
  }

  constructor() {
    // Load from storage if exists
    const stored = localStorage.getItem('settingDocs');
    if (stored) {
      const arr = JSON.parse(stored);
      this.docs = this.docs.map(doc => ({ ...doc, ...arr.find((d: any) => d.type === doc.type) }));
    }
  }

  selectDoc(type: 'terms' | 'privacy' | 'about') {
    this.selectedType = type;
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedDoc.pdfData = reader.result as string;
      this.selectedDoc.filename = file.name;
      this.persistDocs();
    };
    reader.readAsDataURL(file);
  }

  persistDocs() {
    localStorage.setItem('settingDocs', JSON.stringify(this.docs));
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.value = '';
    fileInput.click();
  }

  viewPdf(pdfData?: string) {
    if (!pdfData) return;
    const pdfWindow = window.open();
    pdfWindow?.document.write(
      `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
    );
  }
}
