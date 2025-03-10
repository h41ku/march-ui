import './index.css'
import './colors.css'
import classNames from 'classnames'

marchUI.TextField = {
    messages: {
        invalidValue: 'Invalid value',
        pleaseWait: 'Please wait...'
    }
}

const doNothing = () => {}

const defaultAttributes = {
    type: 'text',
    placeholder: '',
    onblur: doNothing,
    onfocus: doNothing,
    oninput: doNothing,
    onerror: doNothing,
    validityDelay: 0,
    validate: inputElement => {
        inputElement.setCustomValidity('')
        return { valid: inputElement.checkValidity() }
    }
}

const TextField = ({ attrs }) => {
    let {
        value,
        focused, state, hint, placeholder,
        onblur, onfocus, oninput, onerror,
        validityDelay, validate, novalidate
    } = {
        ...defaultAttributes,
        ...attrs
    }
    const initialPlaceholder = placeholder
    let timeoutId
    let validationRequestId = 0
    let validationProcess = false
    const validateAsync = (requestId, inputElement) => () => {
        Promise.resolve(validate(inputElement))
            .then(result => {
                if (validationRequestId === requestId) { // response is actual
                    const { valid, message } = result
                    state = valid ? 'valid' : 'invalid'
                    if (message !== undefined) {
                        inputElement.setCustomValidity(message)
                        hint = message
                    } else if (valid) {
                        inputElement.setCustomValidity('')
                        hint = undefined
                    }
                    m.redraw()
                }
            })
            .catch(error => {
                state = 'invalid'
                onerror(error)
                m.redraw()
            })
            .finally(() => {
                validationProcess = false
            })
    }
    const validateInput = (inputElement, useRedraw) => {
        if (!novalidate && !validationProcess) {
            validationProcess = true
            const prevState = state
            state = 'loading'
            hint = undefined
            if (prevState !== state && useRedraw && validityDelay > 0) {
                m.redraw()
            }
            const requestId = ++ validationRequestId
            clearTimeout(timeoutId)
            if (validityDelay > 0) {
                timeoutId = setTimeout(
                    validateAsync(requestId, inputElement),
                    validityDelay
                )
            } else {
                validateAsync(requestId, inputElement)()
            }
        }
    }
    const onblurHandler = evt => {
        focused = false
        placeholder = initialPlaceholder
        return onblur(evt)
    }
    const onfocusHandler = evt => {
        focused = true
        placeholder = ''
        return onfocus(evt)
    }
    const oninputHandler = evt => {
        value = evt.target.value
        const result = oninput(evt)
        validateInput(evt.target)
        return result
    }
    return {
        onupdate({ dom }) {
            const inputElement = dom.querySelector('input')
            if (state === 'valid') {
                inputElement.setCustomValidity('')
            } else if (state === 'invalid') {
                inputElement.setCustomValidity(hint || marchUI.TextField.messages.invalidValue)
            } else if (state === 'loading') {
                inputElement.setCustomValidity(marchUI.TextField.messages.pleaseWait)
            }
        },
        view({ attrs }) {
            const {
                title, iconLeft, iconRight, hint: hintNext, required, readonly, disabled,
                onblur: onblurNext, onfocus: onfocusNext, oninput: oninputNext,
                validate: validateNext, pattern,
                placeholder: placeholderDropped,
                state: stateNext,
                ...rest
            } = {
                ...defaultAttributes,
                ...attrs,
                value
            }
            onblur = onblurNext
            onfocus = onfocusNext
            oninput = oninputNext
            validate = validateNext
            if (stateNext !== undefined) {
                state = stateNext
            }
            if (hintNext !== undefined) {
                hint = hintNext
            }
            const classes = classNames('textfield', {
                'textfield--focused': focused,
                'textfield--required': required,
                'textfield--readonly': readonly,
                'textfield--disabled': disabled,
                'textfield--invalid': state === 'invalid',
                'textfield--valid': state === 'valid',
                'textfield--loading': state === 'loading'
            })
            const attributes = {
                placeholder,
                ...(required ? { required } : {}),
                ...(readonly ? { readonly } : {}),
                ...(disabled ? { disabled } : {}),
                ...rest
            }
            return (
                <label class={classes}>
                    {title && <div class="textfield__title">{title}</div>}
                    <div class="textfield__field">
                        {iconLeft && <div class="textfield__icon">{iconLeft}</div>}
                        <div class="textfield__input">
                            <input {...attributes}
                                onblur={onblurHandler}
                                onfocus={onfocusHandler}
                                oninput={oninputHandler}
                            />
                        </div>
                        <div class="textfield__state textfield__state--valid">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z"/></svg>
                        </div>
                        <div class="textfield__state textfield__state--invalid">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8"/></svg>
                        </div>
                        <div class="textfield__state textfield__state--loading">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"/></svg>
                        </div>
                        {iconRight && <div class="textfield__icon">{iconRight}</div>}
                    </div>
                    {hint && <div class="textfield__hint">{hint}</div>}
                </label>
            )
        }
    }
}

export default TextField
