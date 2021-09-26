export const hasClass = (el: HTMLElement, className: string): boolean => {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export const addClass = (el: HTMLElement, className: string): void => {
  if (hasClass(el, className)) {
    return
  }
  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export const getData = (el: Element, name: string, val?: string): void | null | string => {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

const vendor: string = (() => {
  const elementStyle = document.createElement('div').style

  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (const key in transformNames) {
    const nameKey = key as keyof typeof transformNames
    const k = transformNames[nameKey] as keyof CSSStyleDeclaration
    if (elementStyle[k] !== undefined) {
      return key
    }
  }

  return ''
})()

export const prefixStyle = (style: string): any => {
  if (!vendor) {
    return ''
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
