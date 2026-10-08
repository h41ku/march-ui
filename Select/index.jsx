import './index.css'
import './colors.css'
import classNames from 'classnames'

marchUI.Select = {
    messages: {
        invalidValue: 'Invalid value',
        pleaseWait: 'Please wait...'
    }
}

const doNothing = () => {}

const defaultAttributes = {
    selected: '',
    items: [],
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

const Select = ({ attrs }) => {
    let {
        focused, state, hint,
        onblur, onfocus, oninput, onerror,
        validityDelay, validate, novalidate
    } = {
        ...defaultAttributes,
        ...attrs
    }
    let timeoutId
    let validationRequestId = 0
    let validationProcess = false
    /**
     * 
     * @param {number} requestId 
     * @param {HTMLSelectElement} inputElement 
     * @returns {() => void}
     */
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
                    globalThis.m.redraw()
                }
            })
            .catch(error => {
                state = 'invalid'
                onerror(error)
                globalThis.m.redraw()
            })
            .finally(() => {
                validationProcess = false
            })
    }
    /**
     * 
     * @param {HTMLSelectElement} inputElement 
     * @param {boolean} useRedraw 
     * @returns {void}
     */
    const validateInput = (inputElement, useRedraw = false) => { // TODO `useRedraw` is always `false`
        if (!novalidate && !validationProcess) {
            validationProcess = true
            const prevState = state
            state = 'loading'
            hint = undefined
            if (prevState !== state && useRedraw && validityDelay > 0) {
                globalThis.m.redraw()
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
    /**
     * 
     * @param {Event} evt 
     * @returns
     */
    const onblurHandler = evt => {
        focused = false
        return onblur(evt)
    }
    /**
     * 
     * @param {Event} evt 
     * @returns 
     */
    const onfocusHandler = evt => {
        focused = true
        return onfocus(evt)
    }
    /**
     * 
     * @param {Event} evt 
     * @returns 
     */
    const oninputHandler = evt => {
        const result = oninput(evt)
        validateInput(/** @type {HTMLSelectElement} */ (evt.target))
        return result
    }
    const subscriptions = {}
    const onFormValid = () => {
        state = 'valid'
    }
    return {
        onremove() {
            Object.values(subscriptions)
                .forEach(unsubscribe => unsubscribe())
        },
        onupdate({ dom }) {
            const inputElement = dom.querySelector('select')
            if (state === 'valid') {
                inputElement.setCustomValidity('')
            } else if (state === 'invalid') {
                inputElement.setCustomValidity(hint || marchUI.Select.messages.invalidValue)
            } else if (state === 'loading') {
                inputElement.setCustomValidity(marchUI.Select.messages.pleaseWait)
            }
        },
        view({ attrs }) {
            const {
                title, iconLeft, iconRight, hint: hintNext, required, readonly, disabled,
                onblur: onblurNext, onfocus: onfocusNext, oninput: oninputNext,
                validate: validateNext, pattern,
                state: stateNext,
                items, selected,
                formRef,
                ...rest
            } = {
                ...defaultAttributes,
                ...attrs
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
            const classes = classNames('select', {
                'select--focused': focused,
                'select--required': required,
                'select--readonly': readonly,
                'select--disabled': disabled,
                'select--invalid': state === 'invalid',
                'select--valid': state === 'valid',
                'select--loading': state === 'loading'
            })
            const attributes = {
                ...(required ? { required } : {}),
                ...(readonly ? { readonly } : {}),
                ...(disabled ? { disabled } : {}),
                ...rest
            }
            if (formRef) {
                subscriptions.formValid = formRef.subscribe('formValid', onFormValid)
            }
            return (
                <label class={classes}>
                    {title && <div class="select__title">{title}</div>}
                    <div class="select__field">
                        {iconLeft && <div class="select__icon">{iconLeft}</div>}
                        <div class="select__input">
                            <select {...attributes}
                                onblur={onblurHandler}
                                onfocus={onfocusHandler}
                                oninput={oninputHandler}
                            >
                                {items.map(/** @type {(item: { value: string, name: string }) => import('../Component').VNode} */ item => (
                                    <option value={item.value} selected={item.value === selected}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div class="select__state select__state--valid">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z"/></svg>
                        </div>
                        <div class="select__state select__state--invalid">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8"/></svg>
                        </div>
                        <div class="select__state select__state--loading">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"/></svg>
                        </div>
                        {iconRight && <div class="select__icon">{iconRight}</div>}
                    </div>
                    {hint && <div class="select__hint">{hint}</div>}
                </label>
            )
        }
    }
}

export default Select
