import { Injectable } from '@angular/core';
import { Contact } from 'src/models/contact.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [
    {
      id: '1',
      nombre: 'Manuel Flores',
      celular: '6641231232',
      correo: 'manuel.flores@cetys.edu.mx'
    },
    {
      id: '2',
      nombre: 'Alejandro Flores',
      celular: '6649876554',
      correo: 'alejadnro.flores@cetys.edu.mx'
    },
    {
      id: '3',
      nombre: 'otro contacto',
      celular: '6641234567',
      correo: 'otrocontacto@cetys.edu.mx'
    }
  ];

  constructor() { }

  getContact(contactId: string): Promise<Contact> {

    return new Promise((resolve, reject) => {
      const foundContact = this.contacts.find((contact) => {
        return contact.id === contactId;
      });
      if (foundContact)
      {
        resolve(foundContact);
      } else {
        reject(null);
      }
    });

  }
  deleteContact(contactId: string): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      const remainingContacts = this.contacts.filter((contact) => {
        return contact.id !== contactId;
      });
      if (JSON.stringify(remainingContacts) !== JSON.stringify(this.contacts)) {
        this.contacts=remainingContacts;
        resolve(true);
      }else {
      reject(false);
      }
    });
  }
  updateContact(contactId: string, updateContact: Contact): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      const updatedContacts = this.contacts.map((contact) => {
        if (contact.id === contactId)
        {
          const newContact = {
            ...contact,
            ...updateContact
          };
          return newContact;
        }
        return contact;
      });
      if (JSON.stringify(updatedContacts) !== JSON.stringify(this.contacts)) {
        this.contacts = updatedContacts;
        resolve(true);
      }else {
        reject(false);
      }

    });
  }
  getContacts(): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
      resolve (this.contacts);
    });
  }



  addContact (contact:Contact): Promise<Boolean> {
    return new Promise ((resolve, reject ) => {
      this.contacts.push(contact);
      resolve(true)
    });
  }
}
