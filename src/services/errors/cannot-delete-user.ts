export class CannotDeleteUserError extends Error {
  constructor() {
    super('Nao é possível deletar um usuário que fez um checkin!')
  }
}
