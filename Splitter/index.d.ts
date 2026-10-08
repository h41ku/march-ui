import type { Component } from '../Component';

export type SplitterProps = {
    view?: 'horizontal' | 'vertical' | string,
    [key: string]: unknown
}

export default function Splitter(props: SplitterProps): Component;
