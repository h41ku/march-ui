import './index.css'
import './colors.css'
import classNames from 'classnames'

const ContextMenu = () => {
    return {
        view({ attrs, children }) {
            const { state } = { state: 'shown', ...attrs }
            const classes = classNames('contextmenu', {
                'contextmenu--shown': state === 'shown',
                'contextmenu--hidden': state === 'hidden'
            })
            return (
                <div class={classes}>
                    {children}
                </div>
            )
        }
    }
}

export default ContextMenu
