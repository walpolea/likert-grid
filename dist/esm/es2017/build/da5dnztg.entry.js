/*! Built with http://stenciljs.com */
import { h } from '../likert-grid.core.js';

class LikertGrid {
    constructor() {
        this.setSubjects = "";
        this.setChoices = "";
        this.subjects = [];
        this.choices = [];
        this.data = {};
    }
    componentWillLoad() {
        this.subjects = this.setSubjects.split(",").map(this.removeLeadingSpaces);
        this.choices = this.setChoices
            .replace(" ", "")
            .split(",")
            .map(this.removeLeadingSpaces);
        this.setup.emit();
    }
    componentDidLoad() { }
    removeLeadingSpaces(str) {
        if (str.indexOf(" ") === 0) {
            str = str.slice(1);
        }
        return str;
    }
    onItemUpdated(ce) {
        const answerIndex = ce.detail.answers.indexOf(true);
        this.data[ce.detail.subject] = {
            chosenAnswer: this.choices[answerIndex],
            chosenAnswerIndex: answerIndex,
            allChoices: this.choices,
            allAnswers: ce.detail.answers
        };
        this.updated.emit(this.data);
    }
    buildGridItems() {
        return this.subjects.map((subject, i) => {
            return (h("likert-grid-item", { onInternalUpdated: this.onItemUpdated.bind(this), subject: subject, choices: this.choices, "show-choices": i === 0 ? "true" : "false" }));
        });
    }
    render() {
        return h("div", { class: "likert-grid" }, this.buildGridItems());
    }
    static get is() { return "likert-grid"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "choices": {
            "type": "Any",
            "attr": "choices",
            "mutable": true
        },
        "data": {
            "state": true
        },
        "setChoices": {
            "type": String,
            "attr": "set-choices"
        },
        "setSubjects": {
            "type": String,
            "attr": "set-subjects"
        },
        "subjects": {
            "type": "Any",
            "attr": "subjects",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "updated",
            "method": "updated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "setup",
            "method": "setup",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host likert-grid-item:nth-child(odd){--bg-color:#ccc}"; }
}

class LikertGridItem {
    constructor() {
        this.subject = "Napkins";
        this.choices = [];
        this.showChoices = true;
        this.data = {};
    }
    NodeListtoArray(obj) {
        var array = [];
        for (var i = obj.length >>> 0; i--;) {
            array[i] = obj[i];
        }
        return array;
    }
    componentDidLoad() {
        this.answerEls = this.NodeListtoArray(this.el.shadowRoot.querySelectorAll(".lg-answer"));
        this.answerEls.forEach(answer => {
            answer.addEventListener("change", this.answerDidChange.bind(this));
        });
    }
    answerDidChange() {
        const answers = this.answerEls.map(answer => {
            return answer["checked"];
        });
        this.data["subject"] = this.subject;
        this.data["answers"] = answers;
        this.updateHandler();
    }
    updateHandler() {
        this.internalUpdated.emit(this.data);
    }
    buildChoices() {
        const choicesArray = this.choices.map(this.buildChoice);
        return h("ul", { class: "lg-choices" + (this.showChoices ? " show" : " no-show") }, choicesArray);
    }
    buildChoice(choice) {
        return h("li", { class: "lg-choice" }, choice);
    }
    buildSubject() {
        return h("article", { class: "lg-answer-subject" }, this.subject);
    }
    buildAnswers() {
        const answersArray = this.choices.map(() => {
            return this.buildAnswer(this.subject);
        });
        return h("section", { class: "lg-answer-group" }, answersArray);
    }
    buildAnswer(subject) {
        subject = subject.toLowerCase();
        subject = subject.replace(" ", "-");
        return h("input", { class: "lg-answer", type: "radio", name: subject });
    }
    render() {
        return (h("div", { class: "likert-grid-item" },
            this.buildChoices(),
            this.buildSubject(),
            this.buildAnswers()));
    }
    static get is() { return "likert-grid-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "choices": {
            "type": "Any",
            "attr": "choices"
        },
        "data": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "showChoices": {
            "type": Boolean,
            "attr": "show-choices"
        },
        "subject": {
            "type": String,
            "attr": "subject"
        }
    }; }
    static get events() { return [{
            "name": "internalUpdated",
            "method": "internalUpdated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host{--bg-color:white}:host .lg-choices.no-show{display:none}:host .likert-grid-item{display:grid;grid-template-columns:1fr 3fr;grid-gap:1rem}:host .lg-choices{list-style:none;margin:0;padding:0;grid-column:2/3;display:-webkit-box;display:-ms-flexbox;display:flex}:host .lg-choices li{margin:0 10px;-webkit-box-flex:1;-ms-flex:1;flex:1}:host .lg-answer-subject{padding:6px;background-color:var(--bg-color);grid-column:1/2;min-width:150px}:host .lg-answer-group{background-color:var(--bg-color);list-style:none;margin:0;padding:5px;grid-column:2/3;display:-webkit-box;display:-ms-flexbox;display:flex;justify-items:center}:host .lg-answer-group input{-ms-flex-preferred-size:100px;flex-basis:100px;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;min-width:100px}"; }
}

export { LikertGrid, LikertGridItem };
