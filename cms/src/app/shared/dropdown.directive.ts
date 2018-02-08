import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  private isOpen = false;
  @HostBinding('class.open') get opened(){
    return this.isOpen;
}
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
    @HostListener('mouseleave') close(){
      this.isOpen = !this.isOpen;
    }
  }

