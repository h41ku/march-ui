import './index.css'
import './colors.css'
import classNames from 'classnames'

const Button = () => {
    return {
        view({ attrs }) {
            const {
                icon, title, state,
                wide, volume, view,
                formRef,
                ...attributes
            } = attrs
            const classes = classNames('button', {
                'button--wide': wide,
                'button--volume': volume,
                'button--loading': state === 'loading',
                'button--primary': view === 'primary',
                'button--secondary': view === 'secondary'
            })
            return (
                <button class={classes} {...attributes}>
                    <div class="button__state button__state--loading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"/></svg>
                    </div>
                    {icon && <div class="button__icon">{icon}</div>}
                    {title && <div class="button__title">{title}</div>}
                </button>
            )
        }
    }
}

export default Button
