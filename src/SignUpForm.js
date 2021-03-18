import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"; // Importar Recaptcha

import {
  // Importar lo necesario de x-form
  useForm,
  $Form,
  $Text,
  $Password,
  $Checkbox,
  $Button,
  $Number,
  CustomField,
  Invalid,
  Valid,
  Option,
  optional,
  button,
  XFormContext,
  spanish,
} from "@tdc-cl/x-form";

import {
  $Name,
  $Email,
  $lastName,
  $Age,
  $Children,
  $Gender,
  $Password1,
  $GenderSpecify,
  $CheckboxVal,
  $FavColor,
} from "./helperVariables"; // Traer los custom fields y validaciones

function App() {
  // Establecer contexto en español
  return (
    <XFormContext.Provider value={{ locale: spanish }}>
      <SignUpForm />
    </XFormContext.Provider>
  );
}

function SignUpForm() {
  const $repeatPassword = CustomField.extends($Password).with({
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
            className="rounded-pill p-1 border-blue"
          />
        );
      },
    },
    // Campo para validar que las dos claves coincidan
    label: "Repeat password",

    validate(value) {
      const { password } = form.fields;

      if (!password.is(value)) {
        return Invalid("Las contraseñas no coinciden");
      }

      return Valid(value);
    },
  });

  const form = useForm(
    // Creación del formulario
    $Form({
      fields: {
        first_name: $Name("Nombre"),
        last_name: $lastName("Apellido"),
        age: $Age("Edad"),
        num_children: optional($Children("Num. de Hijos")),
        gender: $Gender("Género").editable(),
        gender_specify: $GenderSpecify("Por favor especifique:").showIf((_) =>
          _.gender.is("Otro (Especifique)")
        ),
        email: $Email("E-mail"),
        password: $Password1("Contraseña"),
        repeatPass: $repeatPassword("Repite la Contraseña"),
        fav_color: optional($FavColor("Color Favorito")),
        tos: $CheckboxVal("Acepto los términos y condiciones del servicio"),
      },
      submit: $Button("Crear cuenta", {
        async onValid(values) {
          fetch("/api/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          })
            .then((resp) => resp.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        },
        onInvalid: "disable",
      }),
    })
  );

  const {
    first_name,
    last_name,
    age,
    num_children,
    gender,
    gender_specify,
    email,
    password,
    repeatPass,
    tos,
    fav_color,
  } = form.fields;

  return (
    <>
      <div className="container">
        <div className="card border-5 border-info maincard">
          <div className="card-body mt-3">
            <div className="row">
              <img
                src={
                  "https://www.logodesign.net/logo/abstract-cuboid-building-4519ld.png"
                }
                style={{ width: "180px", height: "95px" }}
                className="ml-2"
              />
              <h3 className="card-title m-auto d-flex justify-content-center w-50 p-3 rounded-pill bg-blue text-white">
                Sign Up Form
              </h3>
            </div>
            <div className="card-text">
              <div className="row mt-5 ml-2 mr-2">
                <div className="col-md-3">{first_name.render()}</div>
                <div className="col-md-3">{last_name.render()}</div>
                <div className="col-md-3">{age.render()}</div>
                <div className="col-md-3">{num_children.render()}</div>
              </div>
              <div className="row mt-5 ml-2 mr-2">
                <div className="col-md-3">{gender.render()}</div>
                <div className="col-md-3">{gender_specify.render()}</div>
                <div className="col-md-3">{email.render()}</div>
                <div className="col-md-3">{password.render()}</div>
              </div>
              <div className="row ml-2 mr-2 mt-5">
                <div className="col">{repeatPass.render()}</div>
                <div className="col">{fav_color.render()}</div>
                <div className="col">
                  <i class="fas fa-shield-alt text-blue"></i>
                  <span className="ml-1"></span>
                  Verificación
                </div>
                <div className="col">{tos.render()}</div>
              </div>
              <div className="row mt-5 d-flex justify-content-center p-1">
                <button
                  {...form.submitter.buttonProps}
                  className="rounded-pill p-2 w-25"
                >
                  {form.submitter.config.label}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
