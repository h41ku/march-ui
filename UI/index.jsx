import m from 'mithril'

window.m = m

import './reset.css'
import './animations.css'
import './colors.css'

window.marchUI = {}

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
