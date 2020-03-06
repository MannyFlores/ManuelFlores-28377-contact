import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.sass']
})
export class ContactDetailComponent implements OnInit {
  status='noedit';

  show(){
    this.status='edit';
  }
  contact:Contact;
  contacts: Contact[];
  contactForm: FormGroup;
  constructor(private activatedRouter: ActivatedRoute,
              private contactService: ContactService,
              private router: Router) { }

  ngOnInit() {
    $('.modal').modal();
    const contactId = this.activatedRouter.snapshot.paramMap.get('contactId');
    this.getContact(contactId);
    this.initForm();

  }
  initForm(){
    this.contactForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),
    celular: new FormControl(null, [Validators.required]),
    correo: new FormControl(null, [Validators.required])
  });
}
patchForm(){
  this.contactForm.patchValue({
    ...this.contact
  });
}
getcontacts(){
  this.contactService.getContacts().then((contacts:Contact[])=>{
    this.contacts=contacts;

  });
}
  getContact(contactId: string) {
    this.contactService.getContact(contactId).then((contact: Contact) => {
      this.contact = contact;
      this.patchForm();
    }).catch((error) => {
      this.router.navigate(['']);
    });
  }
  deleteContact(contactId: string) {
    this.contactService.deleteContact(contactId).then((result) =>{
      this.getcontacts();
      this.modal();
      this.router.navigate(['']);
    }).catch((error) => {

    });
  }
  modal() {
    $('#borrar').modal('open');
  }


  onSubmit(){
    if (this.contactForm.valid) {
      const updatedContact: Contact = {
        id: this.contact.id,
        ...this.contactForm.value
      };
      this.contactService.updateContact(this.contact.id, updatedContact).then((res)=>{
        this.actualizar();
        this.router.navigate(['']);
      }).catch((error)=>{

      });
    }else {
      alert('formulario no esta completo');
    }
  }
  actualizar() {
    $('#actualizar').modal('open');

  }
  toshow() {
    this.status = 'edit';
  }
}
