import {
  $Text,
  $Password,
  $Checkbox,
  $Number,
  CustomField,
  Invalid,
  Valid,
  $Select,
} from "@tdc-cl/x-form";

const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const ageRegex = /^(1[89]|[2-9]\d)$/;
const childrenRegex = /^[0-9]{1,2}$/;
const isTrue = /^(true)$/;
const colorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
export const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const $Email = CustomField.extends($Text).with({
  render: {
    FieldContainer({ field, children }) {
      return (
        <div ref={field.containerRef}>
          <i class="fas fa-envelope-open-text text-blue"></i> {children}
        </div>
      );
    },
    Input({ field }) {
      return (
        <input
          {...field.inputProps}
          ref={field.inputRef}
          className="rounded-pill border-blue p-1 w-100"
        />
      );
    },
  },
  validate(value) {
    if (!emailRegex.test(value)) {
      return Invalid("Modelo: johndoe@abc.com");
    }

    return Valid(value);
  },
});

export const $Name = CustomField.extends($Text).with({
  render: {
    FieldContainer({ field, children }) {
      return (
        <div ref={field.containerRef}>
          <i class="fas fa-id-card text-blue"></i> {children}
        </div>
      );
    },
    Input({ field }) {
      return (
        <input
          {...field.inputProps}
          ref={field.inputRef}
          className="rounded-pill p-1 border-blue w-100"
        />
      );
    },
  },
  validate(value) {
    if (!nameRegex.test(value)) {
      return Invalid("Favor usar letras (A-Z)");
    }

    return Valid(value);
  },
});

export const $lastName = CustomField.extends($Text).with({
  render: {
    FieldContainer({ field, children }) {
      return (
        <div ref={field.containerRef}>
          <i class="far fa-id-card text-blue"></i> {children}
        </div>
      );
    },
    Input({ field }) {
      return (
        <input
          {...field.inputProps}
          ref={field.inputRef}
          className="rounded-pill p-1 border-blue w-100"
        />
      );
    },
  },
  validate(value) {
    if (!nameRegex.test(value)) {
      return Invalid("Favor usar letras (A-Z)");
    }

    return Valid(value);
  },
});

export const $Age = CustomField.extends($Number).with({
  render: {
    FieldContainer({ field, children }) {
      return (
        <div ref={field.containerRef}>
          <i class="fas fa-clock text-blue"></i> {children}
        </div>
      );
    },
    Input({ field }) {
      return (
        <input
          {...field.inputProps}
          ref={field.inputRef}
          className="rounded-pill p-1 border-blue w-100"
        />
      );
    },
  },
  validate(value) {
    if (!ageRegex.test(value)) {
      return Invalid("Edad inválida! (+18)");
    }

    return Valid(value);
  },
});

export const $Children = CustomField.extends($Number).with({
  render: {
    FieldContainer({ field, children }) {
      return (
        <div ref={field.containerRef}>
          <i class="fas fa-users text-blue"></i> {children}
        </div>
      );
    },
    Input({ field }) {
      return (
        <input
          {...field.inputProps}
          ref={field.inputRef}
          className="rounded-pill p-1 border-blue w-100"
        />
      );
    },
  },
  validate(value) {
    if (!childrenRegex.test(value)) {
      return Invalid("Cantidad inválida!");
    }

    return Valid(value);
  },
});

export const $Gender = CustomField.extends($Select).with({
  classNames: {
    Input: "p-1 rounded-pill border-blue w-100",
  },
  render: {
    FieldContainer({ field, children }) {
      return (
        <div ref={field.containerRef}>
          <i class="fas fa-venus-mars text-blue"></i> {children}
        </div>
      );
    },
  },
  options: [
    { value: "F", label: "Femenino" },
    { value: "M", label: "Masculino" },
    { value: "X", label: "Otro (especifique)" },
  ],
});

export const $Password1 = CustomField.extends($Password).with({
  render: {
    FieldContainer({ field, children }) {
      return (
        <div ref={field.containerRef}>
          <i class="fas fa-key text-blue"></i> {children}
        </div>
      );
    },
    Input({ field }) {
      return (
        <input
          {...field.inputProps}
          ref={field.inputRef}
          className="rounded-pill p-1 border-blue w-100"
        />
      );
    },
  },
  validate(value) {
    if (!passRegex.test(value)) {
      return Invalid("Al menos 8 carácteres, 1 letra y 1 número");
    }

    return Valid(value);
  },
});

export const $GenderSpecify = CustomField.extends($Text).with({
  render: {
    FieldContainer({ field, children }) {
      return <div ref={field.containerRef}>{children}</div>;
    },
    Input({ field }) {
      return (
        <input
          {...field.inputProps}
          ref={field.inputRef}
          className="rounded-pill p-1 border-blue w-100"
        />
      );
    },
  },
  validate(value) {
    if (!nameRegex.test(value)) {
      return Invalid("Favor usar letras (A-Z)");
    }

    return Valid(value);
  },
});

export const $CheckboxVal = CustomField.extends($Checkbox).with({
  validate(value) {
    if (!isTrue.test(value)) {
      return Invalid("Aceptar términos para continuar");
    }

    return Valid(value);
  },
});

export const $FavColor = CustomField.extends($Text).with({
  render: {
    FieldContainer({ field, children }) {
      return (
        <div ref={field.containerRef}>
          <i class="fas fa-palette text-blue"></i> {children}
        </div>
      );
    },
    Input({ field }) {
      return (
        <input
          {...field.inputProps}
          ref={field.inputRef}
          className="rounded-pill border-blue w-100"
          type="color"
        />
      );
    },
  },
  validate(value) {
    if (!colorRegex.test(value)) {
      return Invalid("No es un color RGB!");
    }

    return Valid(value);
  },
});
