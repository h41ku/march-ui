import type { Component } from '../Component';

export type UIProps = {
    settings?: {},
    [key: string]: unknown
}

export default function UI(props: UIProps): Component;
