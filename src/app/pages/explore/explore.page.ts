import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CAGED_SCALE } from 'src/app/constants/caged-scale.constant';
import { UtilsService } from 'src/app/services/utils/utils.service';

import { CHROMATIC_SCALE } from '../../constants/chromatic-scale.constant';
import { FRETBOARD_STANDARD } from '../../constants/fretboard-notes.constant';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  exploreForm: FormGroup;
  fretboardNotes: string[][];
  chromaticScale: string[];
  cagedScale: string[];

  constructor(private readonly fb: FormBuilder, private readonly utils: UtilsService) {}

  ngOnDestroy() {
    this.destroyed$.next(), this.destroyed$.complete();
  }

  ngOnInit() {
    this.fretboardNotes = FRETBOARD_STANDARD;
    this.chromaticScale = CHROMATIC_SCALE;
    this.cagedScale = CAGED_SCALE;
    this.setForm();
  }

  setForm(): FormGroup {
    const form = this.fb.group({
      selectedNotes: [this.cagedScale, [Validators.required]],
      fretStart: [0, [Validators.required, Validators.min(0), Validators.max(12)]],
      fretEnd: [12, [Validators.required, Validators.min(0), Validators.max(12)]],
    });

    return (this.exploreForm = form);
  }
}
