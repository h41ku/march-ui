import type { Component } from '../Component';

export type ButtonProps = {
    title: string,
    icon?: Component,
    state?: 'loading' | 'normal' | string,
    view?: 'primary' | 'secondary' | 'default' | string,
    wide?: boolean,
    volume?: boolean,
    disabled?: boolean,
    type?: 'submit' | 'clear' | 'button' | string,
    [key: string]: unknown
}

export default function Button(props: ButtonProps): Component;
