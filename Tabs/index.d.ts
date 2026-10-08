import type { Component } from '../Component';

export type TabsProps = {
    active?: number | string,
    [key: string]: unknown
}

export default function Tabs(vnode: TabsProps): Component;
