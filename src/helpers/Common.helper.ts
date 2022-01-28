export function copyText(vue, elementRef = 'link') {
  const copyText = vue.$refs[elementRef] as any
  copyText.select()
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  document.execCommand("copy")
  vue.$buefy.toast.open({
    // TODO: ok2 ADD TRANSLATION
    message: 'text copied',
    type: 'is-success',
    duration: 3000
  } as any)
}

const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/

export function isInputValid(type, value) {
  if (!type || !value) return false;

  if (type === 'email') {
    return regexEmail.test(value)
  }
  if (type === 'phoneNumber') {
    const phoneNumber = String(Number(value));
    return regexPhone.test(phoneNumber) && phoneNumber.length > 8 && phoneNumber.length < 15
  }

  return false
}