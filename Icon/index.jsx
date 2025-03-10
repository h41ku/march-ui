const fallbackIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"></svg>`

const iconsCache = new Map()

marchUI.Icon = {
    location: '/assets/icons/'
}

const Icon = ({ attrs: { name } }) => {
    let icon = fallbackIcon
    const { 1: prefix, 2: item } = ('' + name).match(/^([a-z][a-z0-9-]*)\:([a-z][a-z0-9-]*)$/) || {}
    const url = prefix && item ? `${marchUI.Icon.location}${prefix}/${item}.svg` : false
    if (url) {
        let promise = iconsCache.get(url)
        if (promise === undefined) {
            promise = fetch(url, {
                    cache: 'default'
                })
                .then(response => response.text())
                .then(result => {
                    return result
                        .replace(/[\r\n]*\<script\>([\r\n]+|.)*?\<\/script\>[\r\n]*/g, '')
                        .replace(/[\r\n]*\<!--([\r\n]+|.)*?--\>[\r\n]*/g, '')
                })
                .catch(error => {
                    console.warn(error)
                })
            iconsCache.set(url, promise)
        }
        promise.then(result => {
            icon = result
            m.redraw()
        })
    }
    return {
        view() {
            return m.trust(icon)
        }
    }
}

export default Icon
