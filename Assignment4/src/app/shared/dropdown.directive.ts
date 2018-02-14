import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  private isOpen = false;
  @HostBinding('class.open')  get opened(){
    return this.isOpen;
  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  // Extra hostlistener that closes the dropdown when mouse leaves
  @HostListener('mouseleave') close(){
    this.isOpen = !this.isOpen;
  }
}
