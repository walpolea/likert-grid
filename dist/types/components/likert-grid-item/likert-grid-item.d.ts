import '../../stencil.core';
import { EventEmitter } from "../../stencil.core";
export declare class LikertGridItem {
    subject: string;
    choices: string[];
    showChoices: boolean;
    data: Object;
    internalUpdated: EventEmitter;
    el: HTMLElement;
    answerEls: HTMLElement[];
    NodeListtoArray(obj: any): any[];
    componentDidLoad(): void;
    answerDidChange(): void;
    updateHandler(): void;
    buildChoices(): JSX.Element;
    buildChoice(choice: any): JSX.Element;
    buildSubject(): JSX.Element;
    buildAnswers(): JSX.Element;
    buildAnswer(subject: any): JSX.Element;
    render(): JSX.Element;
}
