import m from 'mithril'

globalThis.m = m

import './reset.css'
import './animations.css'
import './colors.css'

globalThis.marchUI = {}

const UI = () => {
    return {
        view({ attrs, children }) {
            const { settings } = attrs
            if (settings) {
                marchUI = settings
            }
            return (
                <>
                    {children}
                </>
            )
        }
    }
}

export default UI
