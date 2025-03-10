import './index.css'
import './colors.css'
import classNames from 'classnames'

const Notice = () => {
    return {
        view({ attrs, children }) {
            const { icon, title, text, view, bordered } = attrs
            const classes = classNames('notice', {
                'notice--bordered' : bordered,
                'notice--danger' : view === 'danger',
                'notice--warning': view === 'warning',
                'notice--success': view === 'success',
                'notice--neutral': view === 'neutral'
            })
            return (
                <div class={classes}>
                    <div class="notice__icon">
                        {icon}
                    </div>
                    <div class="notice__content">
                        <div class="notice__title">
                            {title}
                        </div>
                        <div class="notice__text">
                            {text}
                        </div>
                        {children}
                    </div>
                </div>
            )
        }
    }
}

export default Notice
