import { Component, OnInit  } from '@angular/core';
import { TranslateService } from './translate/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'icoo';
  supportedLangs = [];
  public translatedText: string;
  constructor(private _translate: TranslateService) { }

  ngOnInit() {
// standing data
this.supportedLangs = [
  { display: 'English', value: 'en' },
  { display: 'Español', value: 'es' },
  { display: 'العربية', value: 'zh' },
  ];

  // set current langage
  this.selectLang('en');
  }

  isCurrentLang(lang: string) {
    // check if the selected lang is current lang
    return lang === this._translate.currentLang;
}

selectLang(lang: string) {
  // set current lang;
  this._translate.use(lang);
  this.refreshText();
}

refreshText() {
  // refresh translation when language change
  this.translatedText = this._translate.instant('hello world');
}


}
