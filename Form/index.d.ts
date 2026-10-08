import type { Component } from '../Component';

export type FormProps = {
    icon?: Component,
    title: string,
    submit?: (evt: Event) => void,
    beforeSubmit?: (evt: Event) => void,
    afterSubmit?: (evt: Event) => void,
    onerror?: (error: Error) => void,
    method?: 'get' | 'post' | string,
    enctype?: 'multipart/form-data' | 'application/x-www-form-urlencoded' | 'text/plain' | string,
    [key: string]: unknown
}

export default function Form(props: FormProps): Component;
