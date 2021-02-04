import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Barre } from 'src/app/models/chord.model';

import { Note } from '@models/note.model';

@Component({
  selector: 'app-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FretboardComponent implements OnInit {
  @Input() disabledStrings: number[];
  @Input() selectedFrets: [number, number];
  @Input() showOnlySelectedFrets = true;
  @Input() selectedNoteNames: string[];
  @Input() rootNote: string;
  @Input() showSelectedNoteNames: boolean;
  @Input() selectedNotes: Note[];
  @Input() showSelectedNotes: boolean;
  @Input() highlightNote: Note;
  @Input() disableClick: boolean;
  @Input() showAll: boolean;
  @Input() invertedStrings: boolean;
  @Input() invertedFrets: boolean;
  @Input() notes: string[][];
  @Input() barre: Barre;
  @Output() noteClick: Subject<Note> = new Subject();

  constructor() {}

  ngOnInit() {}

  onNoteClicked(noteObject: Note, noteElement: any): void {
    if (this.disableClick) {
      return;
    }
    this.noteClick.next(noteObject);
    if (this.showAll || (this.showSelectedNoteNames && this.isGoodNoteName(noteObject.name))) {
      return;
    }
    noteElement.style.opacity = 1;

    setTimeout(() => {
      noteElement.style.opacity = 0;
    }, 1000);
  }

  isGoodNoteName(noteName: string): boolean {
    if (!this.selectedNoteNames) {
      return false;
    }
    return this.selectedNoteNames.includes(noteName);
  }

  isGoodNote(n: Note) {
    if (!this.selectedNotes) {
      return false;
    }
    return this.selectedNotes.reduce((accumulator: boolean, current: Note) => {
      return accumulator || (current.fret === n.fret && current.string === n.string);
    }, false);
  }

  showNote(n: Note) {
    return (
      (this.showSelectedNoteNames && this.isGoodNoteName(n.name)) ||
      (this.showSelectedNotes && this.isGoodNote(n))
    );
  }

  isSelectedFret(fret: number): boolean {
    if (
      !this.selectedFrets ||
      this.selectedFrets.length < 2 ||
      this.selectedFrets[0] >= this.selectedFrets[1]
    ) {
      return true;
    }
    return fret >= this.selectedFrets[0] && fret <= this.selectedFrets[1];
  }

  isNoteHighlighted(fret: number, selectedString: number) {
    if (!this.highlightNote) {
      return false;
    }
    if (this.highlightNote.fret === fret && selectedString === this.highlightNote.string) {
      return true;
    }
    return false;
  }

  getNum(n: any) {
    // TODO remove when AngularLanguageService fixes its bug
    return +n;
  }

  isElementInViewport(el: HTMLElement | any) {
    // NOTE: need to work on that
    let top = el.offsetTop;
    let left = el.offsetLeft;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
      top + height <= window.pageYOffset + window.innerHeight &&
      left + width <= window.pageXOffset + window.innerWidth
    );
  }

  isStringDisabled(stringNumber: number) {
    if (!this.disabledStrings || !this.disabledStrings.length) {
      return false;
    }
    return this.disabledStrings.includes(stringNumber);
  }
}
