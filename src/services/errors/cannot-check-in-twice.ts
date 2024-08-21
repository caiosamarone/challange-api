export class CannotCheckInTwice extends Error {
  constructor() {
    super('Não é possível realizar Check-in duas vezes no mesmo dia!')
  }
}
