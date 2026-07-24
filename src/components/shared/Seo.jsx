import { useEffect } from 'react'

function ensureMeta(name, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }
  return element
}

function Seo({ title, description, image }) {
  const defaultImage = `${import.meta.env.BASE_URL}favicon.svg`
  const metaImage = image || defaultImage

  useEffect(() => {
    document.title = title

    ensureMeta('description').setAttribute('content', description)
    ensureMeta('og:title', 'property').setAttribute('content', title)
    ensureMeta('og:description', 'property').setAttribute('content', description)
    ensureMeta('og:image', 'property').setAttribute('content', metaImage)
    ensureMeta('twitter:title').setAttribute('content', title)
    ensureMeta('twitter:description').setAttribute('content', description)
    ensureMeta('twitter:image').setAttribute('content', metaImage)
  }, [description, metaImage, title])

  return null
}

export default Seo
