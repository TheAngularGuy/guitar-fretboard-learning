import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { fretboardNotes } from 'src/app/data/fretboard-notes.data';

@Component({
  selector: 'app-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss']
})
export class FretboardComponent implements OnInit {
  @Input() noteSelected: string = 'A';
  @Output() noteClick: EventEmitter<string>;
  notes: any[];

  constructor() { }

  ngOnInit() {
    this.noteClick = new EventEmitter();
    this.notes = fretboardNotes;
  }

  onNoteClicked(note: string, noteElement: any, btnElement: any): void {
    this.noteClick.emit(note);
    btnElement.color = this.getBtnColor(note);
    noteElement.style.opacity = 1;

    setTimeout(() => {
      btnElement.color = '';
      noteElement.style.opacity = 0;
    }, 1000);
  }

  getBtnColor(note: string): string {
    if (!this.noteSelected) { return ''; }
    if (!this.noteSelected || this.noteSelected != note) { return 'warn'; }
    return 'primary';
  }
}
