import { App } from 'vue'

const upperFirst = (string: string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

const camelCase = (string: string) => {
  return string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export const importComponents = (app: App) => {
  const components = import.meta.globEager('./**/*.vue')

  Object.entries(components).forEach(([path, definition]) => {
    const filename = path
      .split('/')
      .pop()
      ?.replace(/\.\w+$/, '')

    if (filename && filename?.indexOf('Async') > -1) {
      return
    }

    const componentName = upperFirst(camelCase(filename as string).replace('ui', 'UI'))

    // Register component on this Vue instance
    app.component(componentName, (definition as any).default)
  })
}

export default importComponents
