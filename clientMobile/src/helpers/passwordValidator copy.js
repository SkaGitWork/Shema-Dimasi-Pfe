export function passwordConfirmValidator(password, passwordConfirm) {
  if (!password) return "Mot de passe obligatoire."
  if (password.length < 4) return "Mot de passe trop court."
  if (password !== passwordConfirm) return "Password confirmation is not the same."
  return ""
}
