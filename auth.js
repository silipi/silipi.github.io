export default (
  createApp,
  store,
  firebaseAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
) =>
  createApp({
    type: "login",
    emailValue: "",
    passwordValue: "",
    store,

    get getTitleText() {
      return this.type === "login" ? "Login" : "Criar uma conta";
    },

    get getButtonSubmitText() {
      return this.type === "login" ? "Entrar" : "Cadastrar";
    },

    get getButtonSwitchTypeText() {
      return this.type === "login"
        ? "Ainda não tem uma conta? Registre-se!"
        : "Já tem uma conta? Logar-se";
    },

    change(e) {
      e.preventDefault();
      this.type = this.type === "login" ? "register" : "login";
    },

    submit(e) {
      e.preventDefault();

      if (this.type === "login") {
        signInWithEmailAndPassword(
          firebaseAuth,
          this.emailValue,
          this.passwordValue
        )
          .then((userCredential) => console.log(userCredential))
          .catch((err) => console.log(err));
        return;
      }

      if (this.type === "register") {
        createUserWithEmailAndPassword(
          firebaseAuth,
          this.emailValue,
          this.passwordValue
        )
          .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((err) => console.log(err));
        return;
      }
    },
  }).mount("#auth");
