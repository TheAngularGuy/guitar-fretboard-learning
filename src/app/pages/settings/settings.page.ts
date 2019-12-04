import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  tunings = [
    'Standard',
    'E-A-C♯-E-A-E',
    'E-A-C♯-E-A-C♯',
    'A-E-A-E-A-C♯',
    'E-A-E-A-C♯-E',
    'B-F♯-B-F♯-B-D♯',
    'F♯-B-D♯-F♯-B-D♯',
    'C-G-C-G-C-E',
    'C-E-G-C-E-G',
    'C-C-G-C-E-G',
    'D-A-D-F♯-A-D',
    'C♯-G♯-C♯-F-G♯-C♯',
    'E-B-E-G#-B-E',
    'F-A-C-F-C-F',
    'C-F-C-F-A-C',
    'F♯-A#-C♯-F♯-C♯-F♯',
    'C♯-F♯-C♯-F♯-G#-C♯',
    'F-F-C-F-A-C',
    'D-G-D-G-B-D',
    'G-G-D-G-B-D',
    'G-B-D-G-B-D',
    'C-G-D-G-B-D',
    'G-B-D-G-B-D',
    'D-G-B-D-G-B-D',
  ];

  constructor() {}

  ngOnInit() {}
}
