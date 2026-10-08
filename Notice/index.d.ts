import type { Component } from '../Component';

export type NoticeProps = {
    icon: Component,
    title?: string,
    text: string,
    view?: 'danger' | 'warning' | 'success' | 'neutral' | string,
    [key: string]: unknown
}

export default function Notice(props: NoticeProps): Component;
