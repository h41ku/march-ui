import type { Component } from '../Component';

export type MenuItemProps = {
    title: string,
    state?: 'selected' | 'disabled' | 'normal' | string,
    iconLeft?: Component,
    iconRight?: Component,
    [key: string]: unknown
}

export default function MenuItem(props: MenuItemProps): Component;
