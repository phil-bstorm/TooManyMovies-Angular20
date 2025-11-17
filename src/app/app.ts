import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/layout/nav-bar/nav-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly _translate = inject(TranslateService);

  protected readonly title = signal('TooManyMovies');

  ngOnInit(): void {
    // Définition des langues disponibles
    this._translate.addLangs(['fr', 'en']);

    // Langue de secours
    this._translate.setFallbackLang('en');

    // Langue par défaut
    this._translate.use('fr');
  }
}
