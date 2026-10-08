import type { Component } from '../Component';

export type TabProps = {
    key: number | string,
    title: string,
    [key: string]: unknown
}

export default function Tab(props: TabProps): Component;
