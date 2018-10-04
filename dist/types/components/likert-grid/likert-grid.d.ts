import '../../stencil.core';
import { EventEmitter } from "../../stencil.core";
export declare class LikertGrid {
    setSubjects: string;
    setChoices: string;
    subjects: string[];
    choices: string[];
    data: Object;
    updated: EventEmitter;
    setup: EventEmitter;
    componentWillLoad(): void;
    componentDidLoad(): void;
    removeLeadingSpaces(str: any): any;
    onItemUpdated(ce: CustomEvent): void;
    buildGridItems(): JSX.Element[];
    render(): JSX.Element;
}
