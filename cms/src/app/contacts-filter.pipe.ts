
import { Pipe, PipeTransform } from '@angular/core';
import { Contact} from "./contacts/contacts.model";

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string) {
    let filteredArray: Contact[] = [];
    // initial for loop we were instructed to write
    // for(let i = 0; i < contacts.length; i++){
    // if(contact.name.toLowerCse().includes(term)) {
    // filteredArray.push(contact);
    //   }
    // }
    // the shortened version provided in directions
    filteredArray = contacts.filter((contact: any) => contact.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredArray.length < 1) {
      return contacts;
    }
    return filteredArray;
  }
}

