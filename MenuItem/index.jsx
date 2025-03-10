import './index.css'
import './colors.css'
import classNames from 'classnames'

const MenuItem = () => {
    return {
        view({ attrs }) {
            const { state, iconLeft, iconRight, title, ...attributes } = { state: 'shown', ...attrs }
            const classes = classNames('menuitem', {
                'menuitem--selected' : state === 'selected',
                'menuitem--disabled' : state === 'disabled'
            })
            return (
                <div class={classes} {...attributes}>
                    {iconLeft && <div class="menuitem__icon">{iconLeft}</div>}
                    <div class="menuitem__title">{title}</div>
                    {iconRight && <div class="menuitem__icon">{iconRight}</div>}
                </div>
            )
        }
    }
}

export default MenuItem
