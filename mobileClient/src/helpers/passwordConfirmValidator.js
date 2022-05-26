export function passwordValidator(password) {
    if (!password) return "Mot de passe obligatoire."
    if (password.length < 4) return 'Mot de passe trop court.'
    return ''
  }
  