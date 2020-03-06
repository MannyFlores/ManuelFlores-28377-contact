import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { Contact } from 'src/models/contact.model';

declare let $: any;

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.sass']
})
export class ContactCreateComponent implements OnInit {

  contactForm: FormGroup;


  constructor(private contactService: ContactService,
              private router: Router) { }

  ngOnInit() {
    $('.modal').modal();
    this.initForm();
  }

  initForm(){
      this.contactForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      nombre: new FormControl(null, [Validators.required]),
      celular: new FormControl(null, [Validators.required]),
      correo: new FormControl(null, [Validators.required])
    });
  }
  onSumit(){
    if (this.contactForm.valid) {
      const newContact: Contact = {

        ...this.contactForm.value
      };
      this.contactService.addContact(newContact).then((result) => {
        this.bien();
        this.router.navigate(['']);
      });
    } else if (this.contactForm.invalid){
      this.mal();
    }
  }
  bien() {
    $('#exito').modal('open');
  }
  mal(){
    $('#falta').modal('open');
  }
}
