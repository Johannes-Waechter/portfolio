import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, TranslatePipe, FormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  privacyChecked = false;
  showPrivacyError = false;

  http = inject(HttpClient);
  translate = inject(TranslateService);

  contactData = {
    name: "",
    email: "",
    message: "",

  }

  mailTest = false;

  post = {
    endPoint: 'https://johannes-waechter.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };


  success = false;

  onSubmit(ngForm: NgForm) {
    const form = ngForm.form;

    if (!this.privacyChecked || form.invalid) {
      this.showPrivacyError = !this.privacyChecked;
      form.markAllAsTouched();
      Object.values(form.controls).forEach(c => c.updateValueAndValidity());
      return;
    }

    if (ngForm.submitted && form.valid && !this.mailTest) {
      const currentLang = this.translate.currentLang || 'en';
      const langCode = currentLang.startsWith('de') ? 'de' : 'en';
      const payload = { ...this.contactData, lang: langCode };
      console.log('Sending payload:', payload); // Debug log
      this.http.post(this.post.endPoint, this.post.body(payload))
        .subscribe({
          next: (response: any) => {
            this.success = true;
            setTimeout(() => this.success = false, 3000);
            ngForm.resetForm();
            this.privacyChecked = false;
          },
          error: (error: any) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && form.valid && this.mailTest) {
      this.success = true;
      setTimeout(() => this.success = false, 3000);
      ngForm.resetForm();
      this.privacyChecked = false;
    }
  }

}
