import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appLonpPress]',
})
export class LonpPressDirective {
  @Input() delay = 50;
  @Output() pressing = new EventEmitter();

  private isPressing: boolean;
  private timeout: any;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isPressing = true;
    this.pressing.emit(event);
    this.loop(event);
  }

  @HostListener('mouseup') onMouseUp() { this.endPress(); }

  @HostListener('mouseleave') onMouseLeave() { this.endPress(); }

  @HostBinding('class.press') get press() { return this.isPressing; }

  loop(event) {
    if (this.pressing) {
      this.timeout = setTimeout(() => {
        this.pressing.emit(event);
        this.loop(event);
      }, this.delay);
    }
  }

  endPress() {
    clearTimeout(this.timeout);
    this.isPressing = false;
  }

}
