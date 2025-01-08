import { Component, computed, signal } from '@angular/core';
import * as kanji from '../assets/kanji.json';
import { NgClass } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly kanji = signal(kanji);

  readonly parsed = computed(() => {
    const data = Object.entries(kanji)
      .filter(([_, value]) => typeof value.jlpt_new === 'number')
      .sort(([ _, val1 ], [ __, val2 ]) => (val2.jlpt_new as number) - (val1.jlpt_new as number))
    .map(([key, value]) => ({ kanji: key, ...value}) );

    const newData = data.flatMap(v => ({ kanji: v.kanji, strokes: v.strokes, grade: v.grade, freq: v.freq, jlpt: v.jlpt_new, meanings: v.meanings, readings_on: v.readings_on, readings_kun: v.readings_kun,  }));
    console.log(newData);

    return data;
  })
}
