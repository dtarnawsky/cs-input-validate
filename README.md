# Accessible Input Validation

This is an example of doing input validation on an `ion-input` with errors that are announced by a screen reader.

Here is the template code for the input and the error message:
```html
<ion-item>
   <ion-input #usernameControl 
      (ionBlur)="validate()" type="text" label="Username"
      aria-describedby="msgUsernameError" [(ngModel)]="username"></ion-input>
</ion-item>
@if (usernameHasError) {
<p class="error" id="msgUsernameError">
   {{usernameError}}
</p>
}
```

There are a few things to note:
- We use a `ViewChild` named `usernameControl` to get a reference to the input element so it can be focused using `setFocus()`.
- We use the `ionBlur` event to call `validate()` when the input loses focus so that an error message is shown
- We use the `aria-describedby` attribute to associate the error message with the input so that it is announced by the screen reader

The `validate` method looks like this:
```typescript
  async validate(focus = false) {
    this.usernameHasError = false;
    this.usernameError = '';
    if (this.username.length <= 3) {
      this.usernameError = 'A username must be at least 3 characters';
    }
    if (this.username.trim() == '') {
      this.usernameError = 'A username must be specified';
    }


    this.usernameHasError = !!this.usernameError;
    if (this.usernameHasError) {
      if (focus) {
        this.usernameControl.setFocus();
      }
    }
  }
  ```

  This method sets whether the username has errors, what the error message is, and if we should focus the input.

  We only focus the input when the form is submitted, and when it is focused the use of `aria-describedby` will cause the error message to be announced by the screen reader as part of the controls description and will allow the user to specify the username..