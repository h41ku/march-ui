import type { Component } from '../Component';

export type SelectProps = {
    selected: string,
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
    items: { value: string | number, name: string }[],
    onblur?: (evt: Event) => void,
    onfocus?: (evt: Event) => void,
    oninput?: (evt: Event) => void,
    onerror?: (error: Error) => void,
    validate?: (inputElement: HTMLSelectElement) => { valid: boolean, message?: string } | Promise<{ valid: boolean, message?: string }>,
    [key: string]: unknown
}

export default function Select(props: SelectProps): Component;
