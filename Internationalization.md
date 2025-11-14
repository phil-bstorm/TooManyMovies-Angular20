# Internationalization

## Sources

[ngx-translate documentation](https://ngx-translate.org/)

## utilisation de la librairie @ngx-translate

### Installation

Pour utiliser la librairie @ngx-translate dans votre projet Angular, vous devez d'abord l'installer via npm. Exécutez la commande suivante dans votre terminal :

```bash
npm i @ngx-translate/core @ngx-translate/http-loader
```

### Mise en place des fichiers de traduction

Créer un dossier `i18n` dans votre répertoire `public` pour y stocker vos fichiers de traduction. Par exemple, vous pouvez créer deux fichiers : `en.json` pour l'anglais et `fr.json` pour le français.

`public/i18n/en.json` :

```json
{
  "features": {
    "auth": {
      "pages": {
        "login": {
          "email-label": "Email",
          "email-input-error-required": "The email is required",
          "email-input-error-email": "The email must look like an email: \"yourName@mail.com\"",

          "password-label": "Password",
          "password-input-error-required": "The password is required",
          "password-input-error-lowerCase": "The password must contain at least one lowercase letter",
          "password-input-error-upperCase": "The password must contain at least one uppercase letter",
          "password-input-error-number": "The password must contain at least one number",
          "password-input-error-tooShort": "The password must be at least 8 characters long",
          "password-input-error-specialChar": "The password must contain at least one special character (e.g., !@#$%^&*)",
          "button-submit": "Log In"
        }
      }
    }
  },
  "components": {
    "layout": {
      "nav-bar": {
        "role-user": "User role: {{role}}"
      }
    }
  }
}
```

`public/i18n/fr.json` :

```json
{
  "features": {
    "auth": {
      "pages": {
        "login": {
          "email-label": "Email",
          "email-input-error-required": "L'email est requis",
          "email-input-error-email": "L'email doit ressembler à un email : \"votreNom@mail.com\"",

          "password-label": "Mot de passe",
          "password-input-error-required": "Le mot de passe est requis",
          "password-input-error-lowerCase": "Le mot de passe doit contenir au moins une lettre minuscule",
          "password-input-error-upperCase": "Le mot de passe doit contenir au moins une lettre majuscule",
          "password-input-error-number": "Le mot de passe doit contenir au moins un chiffre",
          "password-input-error-tooShort": "Le mot de passe doit contenir au moins 8 caractères",
          "password-input-error-specialChar": "Le mot de passe doit contenir au moins un caractère spécial (ex. : !@#$%^&*)"
        }
      }
    }
  },
  "components": {
    "layout": {
      "nav-bar": {
        "role-user": "Role du user: {{role}}"
      }
    }
  }
}
```

_🔎 dans la traduction française, il manque le "password-button-submit" pour tester le fallback_

### Configuration

#### Ajout du provider de traduction

Dans le fichier `src/app/app.config.ts`, ajouter le _provide_ de traduction pour charger les fichiers de traduction (après le `provideHttpClient`).

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),

    // ON AJOUTE LE PROVIDE DE TRADUCTION ICI
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
    }),
  ],
};
```

#### Activation dans App

Dans le fichier `src/app/app.component.ts`, injecter le service de traduction et définir la langue par défaut.

La langue de base est définie sur le français (`fr`) et l'anglais (`en`) est ajouté comme langue disponible et comme langue de secours.

```typescript
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
```

### Utilisation dans les composants

Importer le `TranslatePipe` (ou `TranslateDirective`) dans le composant où vous souhaitez utiliser la traduction.

```typescript
@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
```

Utiliser la pipe `translate` dans le template HTML pour traduire les chaînes de caractères.

```html
<label for="email">{{ 'features.auth.pages.login.email-label' | translate }}: </label>
```

```html
<label for="password">{{ 'features.auth.pages.login.password-label' | translate }}:</label>
```

Si il n'y a pas de traduction disponible dans la langue courante, la langue de secours sera utilisée automatiquement.

```html
<button type="submit" [disabled]="loginForm.invalid">
  {{ 'features.auth.pages.login.button-submit' | translate }}
</button>
```

### Passage d'un paramètre à la traduction

Pour mettre un paramètre dans une traduction, il faut prévoir dans la chaîne de traduction un espace réservé avec la syntaxe `{{paramName}}`.

Par exemple, afficher le role de l'utilisateur dans la barre de navigation.

```json
"components": {
    "layout": {
      "nav-bar": {
        "role-user": "User role: {{role}}"
      }
    }
  }
```

Dans le template HTML, il faut passer un objet avec les paramètres à la pipe `translate`.

```html
{{ 'components.layout.nav-bar.role-user' | translate: { role: role() } }}
```

### Changement de langue à la volée

Pour changer la langue de l'application à la volée, vous pouvez utiliser la méthode `use` du service `TranslateService`. Par exemple, vous pouvez ajouter 2 boutons de langue dans votre barre de navigation.

```html
<button (click)="onChangeLangage('fr')">FR</button
><button (click)="onChangeLangage('en')">EN</button>
```

Dans le composant TypeScript de la barre de navigation, injecter le service `TranslateService`, ajoutez la méthode `onChangeLangage` pour changer la langue.

```typescript
onChangeLangage(lang: string) {
    this._translate.use(lang);
  }
```
