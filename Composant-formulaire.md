# Composant pour formulaire

Si vous souhaitez créer un composant réutilisable pour un formulaire et qu'il soit compatible avec `ReactiveFromsModule`, voici comment faire:

_Dans cette exemple, nous allons créer un `password input` avec un oeil pour afficher/cacher la valeur entrée_

## 1. Créer le composant formulaire

```bash
ng g c .\components\form\passwordInput
```

## 2. Implémenter le composant (sans prendre en compte `ReactiveFormsModule` pour l'instant)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-password-input',
  imports: [],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
})
export class PasswordInput {
  showPassword: boolean = false;

  // Gestion visibilité password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
```

```html
<input type="{{showPassword?'text':'password'}}" /> <span (click)="togglePasswordVisibility()">
  {{showPassword ? 'Hide' : 'Show'}}
</span>
```

## 3. Ajouter le support pour `ReactiveFormsModule`

Dans la déclaration du composant, on rajoute un provider pour `NG_VALUE_ACCESSOR` et on implémente l'interface `ControlValueAccessor`

```typescript
@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInput),
      multi: true,
    },
  ],
})
export class PasswordInput implements ControlValueAccessor {
  //...
}
```

### Pourquoi ?

- `ControlValueAccessor` est l’interface qu’un composant doit implémenter pour être compatible avec les formulaires Angular (comme un `<input>` natif).

- `NG_VALUE_ACCESSOR` est le token que les formulaires Angular utilisent pour savoir comment parler à ton composant.

- Le `provider` dit à Angular :

  “Quand tu vois `formControlName` sur `<app-password-input>`, utilise cette classe (`PasswordInput`) comme adaptateur de valeur”.

- `forwardRef` est nécessaire parce que la classe `PasswordInput` n’est pas encore définie au moment où le décorateur est évalué.

Sans ce provider : Angular ne sait pas que ton composant est un contrôle de formulaire, donc `formControlName` ne fonctionne pas.

## 2. Ajouter un état interne : value et disabled

```typescript
export class PasswordInput implements ControlValueAccessor {
  showPassword = false;
  value: string = '';
  disabled = false;

  // Callbacks
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  // Gestion visibilité password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
```

### Pourquoi ?

Quand ton composant devient un contrôle de formulaire, il a besoin de :

- `value`: la **valeur actuelle** du contrôle (le mot de passe saisi).

- `disabled`: l’état activé/désactivé (ex : `formControl.disable()`).

- `onChange`: une **fonction fournie** par Angular que tu appelleras à chaque fois que la valeur change dans ton composant.

- `onTouched`: une **fonction fournie** par Angular que tu appelleras quand l’utilisateur quitte le champ (blur).

Ça permet de faire le lien :

- **Parent (FormGroup) ⇄ Ton composant**

## 3. Implémenter les méthodes de ControlValueAccessor
L’interface ControlValueAccessor impose 4 méthodes :

```typescript
export class PasswordInput implements ControlValueAccessor {
  showPassword = false;
  value: string = '';
  disabled = false;

  // Callbacks
  onChange = (value: any) => {};
  onTouched = () => {};

  // Gestion visibilité password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
```

### À quoi elles servent ?
`writeValue(value: any)`
- Appelée par Angular quand :
  - tu initialises le formulaire (`form.patchValue({ password: 'abc' })`)
  - tu reset le formulaire
- Ici, on se contente de stocker la valeur dans `this.value` pour que l’input l’affiche.

`registerOnChange(fn: any)`
- Angular appelle cette méthode et te donne une fonction `fn`.
- Ensuite, c’est à toi d’appeler `this.onChange(...)` chaque fois que l’utilisateur modifie la valeur.
- C’est comme brancher ton composant au tuyau “la valeur a changé”.

`registerOnTouched(fn: any)`
- Pareil que ci-dessus, mais pour l’état “**touché**” (quand l’utilisateur a interagi avec le champ).
- Tu appelleras `this.onTouched()` quand l’utilisateur quitte le champ (événement `blur`).

`setDisabledState(isDisabled: boolean)`
- Appelée quand le `FormControl` est activé/désactivé via :
  - `control.disable()`
  - `control.enable()`
- Tu mets à jour `this.disabled` pour que le template puisse binder `[disabled]="disabled"`.

## 4. Propager les changements depuis l’input : handleInput

```typescript
@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInput),
      multi: true,
    },
  ],
})
export class PasswordInput implements ControlValueAccessor {
  showPassword = false;
  value: string = '';
  disabled = false;

  // Callbacks
  onChange = (value: any) => {};
  onTouched = () => {};

  // Gestion visibilité password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Quand l'utilisateur tape
  handleInput(event: any) {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
  }
}
```

### Pourquoi ?

Quand l’utilisateur tape dans l’input :

1. On récupère la valeur (`event.target.value`)
2. On met à jour l’état interne du composant (`this.value`)
3. On informe le système de formulaires Angular : `this.onChange(val)`

Ce `onChange` est la fonction qu’Angular a fournie via `registerOnChange`.

En gros :

**User tape → composant → onChange → FormControl → FormGroup**

## 5. Adapter le template HTML

On lie les propriétés et événements dans le template :

```html
<input
  [type]="showPassword ? 'text' : 'password'"
  [value]="value"
  [disabled]="disabled"
  (input)="handleInput($event)"
  (blur)="onTouched()"
/>

<button (click)="togglePasswordVisibility()">
  {{ showPassword ? 'Hide' : 'Show' }}
</button>
```
