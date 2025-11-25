import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, TranslatePipe, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  privacyChecked = false;
  showPrivacyError = false;

  http = inject(HttpClient);

  contactData = {
    name: "",
    email : "",
    message: "",

  }

    mailTest = true;

  post = {
    endPoint: 'https://johannes-waechter/sendMail.php',
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
    if (!this.privacyChecked) {
      this.showPrivacyError = true;
      setTimeout(() => this.showPrivacyError = false, 3000);
      return;
    }
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response : any) => {
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
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      this.success = true;
      setTimeout(() => this.success = false, 3000);
      ngForm.resetForm();
      this.privacyChecked = false;
    }
  }

}
