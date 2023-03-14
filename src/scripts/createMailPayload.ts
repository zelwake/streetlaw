export function createMailPayload(
  email: string,
  id: string,
  emailVerificationHash: string
) {
  return {
    from: 'noreply@streetlaw.eu',
    to: email,
    subject: 'Zpráva od noreply.registrace',
    html: `<h1>Děkujeme za registraci</h1>
        <p>Pro její dokončení klikněte na odkaz níže</p>
        <p><a href='${process.env.WEBSITE_URL}/auth/confirmation?id=${id}&token=${emailVerificationHash}'>Potvrzení emailu</a></p>`,
  }
}
