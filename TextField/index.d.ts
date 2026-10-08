import type { Component } from '../Component';

export type TextFieldProps = {
    type?: 'text' | 'password' | 'number' | 'email' | 'url' | 'tel' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'file' | string,
    placeholder?: string,
    value?: unknown,
    iconLeft?: Component,
    iconRight?: Component,
    required?: boolean,
    focused?: boolean,
    readonly?: boolean,
    disabled?: boolean,
    state?: 'loading' | 'valid' | 'invalid' | 'normal' | string,
    hint?: string,
    validityDelay?: number,
    novalidate?: boolean,
    onblur?: (evt: Event) => void,
    onfocus?: (evt: Event) => void,
    oninput?: (evt: Event) => void,
    onerror?: (error: Error) => void,
    validate?: (inputElement: HTMLSelectElement) => { valid: boolean, message?: string } | Promise<{ valid: boolean, message?: string }>,
    [key: string]: unknown
}

export default function TextField(props: TextFieldProps): Component;
