import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private snackBar: MatSnackBar) { }

  validateFrets(context: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!context || !context.locateForm
        || !context.locateForm.get('fretEnd')
        || !context.locateForm.get('fretStart')) {
        return null;
      }
      const end = Number(context.locateForm.get('fretEnd').value);
      const start = Number(context.locateForm.get('fretStart').value);
      if (end <= start) { return { frets: true }; }
      return null;
    };
  }

  validateSelectedNotes(control: AbstractControl): ValidationErrors | null {
    if (!control || !control.value) { return null; }
    if (control.value.length <= 2) {
      return { selectedNotes: true };
    }
    return null;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

}
