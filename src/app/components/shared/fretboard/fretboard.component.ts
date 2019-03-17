import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { fretboardNotes } from 'src/app/data/fretboard-notes.data';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss']
})
export class FretboardComponent implements OnInit {
  @Input() selectedNotes: string[];
  @Input() showSelectedNotes: boolean;
  @Input() showAll: boolean;
  @Output() noteClick: EventEmitter<Note> = new EventEmitter();
  notes: any[];

  constructor() { }

  ngOnInit() {
    this.notes = fretboardNotes;
  }

  onNoteClicked(noteObject: Note, noteElement: any, btnElement: any): void {
    this.noteClick.emit(noteObject);
    if (this.showAll || (this.showSelectedNotes && this.isGoodNote(noteObject.note))) { return; }
    btnElement.color = this.getBtnColor(noteObject.note);
    noteElement.style.opacity = 1;

    setTimeout(() => {
      btnElement.color = '';
      noteElement.style.opacity = 0;
    }, 1000);
  }

  /**
   * Return true if note is in the #selectedNotes array
   * @param  {string} note
   * @returns boolean
   */
  isGoodNote(note: string): boolean {
    return this.selectedNotes.includes(note);
  }

  /**
   * Return the color thepending on the #selectedNotes
   * @param  {string} note
   * @returns string
   */
  getBtnColor(note: string): string {
    if (!this.selectedNotes || !this.selectedNotes.length) { return ''; }
    if (!this.selectedNotes || !this.isGoodNote(note)) { return 'warn'; }
    return 'primary';
  }
}
