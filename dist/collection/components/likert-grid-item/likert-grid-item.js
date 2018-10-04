export class LikertGridItem {
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
    static get style() { return "/**style-placeholder:likert-grid-item:**/"; }
}
