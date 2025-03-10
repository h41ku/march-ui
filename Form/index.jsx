import './index.css'
import './colors.css'

const doNothing = () => {}

const defaultAttributes = {
    submit: () => true,
    beforeSubmit: doNothing,
    afterSubmit: doNothing,
    onerror: doNothing
}

const Form = ({ attrs }) => {
    let { submit, beforeSubmit, afterSubmit, onerror, reportValidity } = { ...defaultAttributes, ...attrs }
    let isPending
    let onsubmit = evt => {
        const formElement = evt.target
        if (!formElement.checkValidity()) {
            formElement.reportValidity()
        } else {
            isPending = false
            beforeSubmit(evt)
            Promise
                .resolve(submit(evt))
                .catch(onerror)
                .finally(() => {
                    isPending = false
                    afterSubmit(evt)
                    m.redraw()
                })
        }
        return false
    }
    return {
        view({ attrs, children }) {
            const { icon, title, onsubmit: onsubmitNext, ...attributes } = {
                method: 'POST',
                enctype: 'multipart/form-data',
                ...attrs
            }
            if (onsubmitNext !== undefined) {
                onsubmit = onsubmitNext
            }
            const classes = 'form'
            return (
                <form class={classes} onsubmit={onsubmit} {...attributes}>
                    <div class="form__header">
                        {icon && <div class="form__icon">{icon}</div>}
                        <div class="form__title">{title}</div>
                    </div>
                    <div class="form__body">
                        {children}
                    </div>
                </form>
            )
        }
    }
}

export default Form
