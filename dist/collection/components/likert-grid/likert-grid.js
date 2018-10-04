export class LikertGrid {
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
    static get style() { return "/**style-placeholder:likert-grid:**/"; }
}
