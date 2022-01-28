export function scrollToElement(element) {
  element.scrollIntoView({ behavior: "smooth" })
}

export function openNewTab(url) {
  window.open(url, '_blank')
}