export class Contact {
  public contactId: string;
  public name: string;
  public email: string;
  public phone: string;
  public imgUrl: string;
  public group: any;


constructor(contactId: string, name: string, email: string, phone: string, imgUrl: string, group: any){
this.contactId = contactId;
this.name = name;
this.email = email;
this.phone = phone;
this.imgUrl = imgUrl;
this.group = group;
}
}
