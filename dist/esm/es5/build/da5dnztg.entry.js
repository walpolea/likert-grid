/*! Built with http://stenciljs.com */
import { h } from '../likert-grid.core.js';
var LikertGrid = /** @class */ (function () {
    function LikertGrid() {
        this.setSubjects = "";
        this.setChoices = "";
        this.subjects = [];
        this.choices = [];
        this.data = {};
    }
    LikertGrid.prototype.componentWillLoad = function () {
        this.subjects = this.setSubjects.split(",").map(this.removeLeadingSpaces);
        this.choices = this.setChoices
            .replace(" ", "")
            .split(",")
            .map(this.removeLeadingSpaces);
        this.setup.emit();
    };
    LikertGrid.prototype.componentDidLoad = function () { };
    LikertGrid.prototype.removeLeadingSpaces = function (str) {
        if (str.indexOf(" ") === 0) {
            str = str.slice(1);
        }
        return str;
    };
    LikertGrid.prototype.onItemUpdated = function (ce) {
        var answerIndex = ce.detail.answers.indexOf(true);
        this.data[ce.detail.subject] = {
            chosenAnswer: this.choices[answerIndex],
            chosenAnswerIndex: answerIndex,
            allChoices: this.choices,
            allAnswers: ce.detail.answers
        };
        this.updated.emit(this.data);
    };
    LikertGrid.prototype.buildGridItems = function () {
        var _this = this;
        return this.subjects.map(function (subject, i) {
            return (h("likert-grid-item", { onInternalUpdated: _this.onItemUpdated.bind(_this), subject: subject, choices: _this.choices, "show-choices": i === 0 ? "true" : "false" }));
        });
    };
    LikertGrid.prototype.render = function () {
        return h("div", { class: "likert-grid" }, this.buildGridItems());
    };
    Object.defineProperty(LikertGrid, "is", {
        get: function () { return "likert-grid"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LikertGrid, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LikertGrid, "properties", {
        get: function () {
            return {
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
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LikertGrid, "events", {
        get: function () {
            return [{
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
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LikertGrid, "style", {
        get: function () { return ":host likert-grid-item:nth-child(odd){--bg-color:#ccc}"; },
        enumerable: true,
        configurable: true
    });
    return LikertGrid;
}());
var LikertGridItem = /** @class */ (function () {
    function LikertGridItem() {
        this.subject = "Napkins";
        this.choices = [];
        this.showChoices = true;
        this.data = {};
    }
    LikertGridItem.prototype.NodeListtoArray = function (obj) {
        var array = [];
        for (var i = obj.length >>> 0; i--;) {
            array[i] = obj[i];
        }
        return array;
    };
    LikertGridItem.prototype.componentDidLoad = function () {
        var _this = this;
        this.answerEls = this.NodeListtoArray(this.el.shadowRoot.querySelectorAll(".lg-answer"));
        this.answerEls.forEach(function (answer) {
            answer.addEventListener("change", _this.answerDidChange.bind(_this));
        });
    };
    LikertGridItem.prototype.answerDidChange = function () {
        var answers = this.answerEls.map(function (answer) {
            return answer["checked"];
        });
        this.data["subject"] = this.subject;
        this.data["answers"] = answers;
        this.updateHandler();
    };
    LikertGridItem.prototype.updateHandler = function () {
        this.internalUpdated.emit(this.data);
    };
    LikertGridItem.prototype.buildChoices = function () {
        var choicesArray = this.choices.map(this.buildChoice);
        return h("ul", { class: "lg-choices" + (this.showChoices ? " show" : " no-show") }, choicesArray);
    };
    LikertGridItem.prototype.buildChoice = function (choice) {
        return h("li", { class: "lg-choice" }, choice);
    };
    LikertGridItem.prototype.buildSubject = function () {
        return h("article", { class: "lg-answer-subject" }, this.subject);
    };
    LikertGridItem.prototype.buildAnswers = function () {
        var _this = this;
        var answersArray = this.choices.map(function () {
            return _this.buildAnswer(_this.subject);
        });
        return h("section", { class: "lg-answer-group" }, answersArray);
    };
    LikertGridItem.prototype.buildAnswer = function (subject) {
        subject = subject.toLowerCase();
        subject = subject.replace(" ", "-");
        return h("input", { class: "lg-answer", type: "radio", name: subject });
    };
    LikertGridItem.prototype.render = function () {
        return (h("div", { class: "likert-grid-item" }, this.buildChoices(), this.buildSubject(), this.buildAnswers()));
    };
    Object.defineProperty(LikertGridItem, "is", {
        get: function () { return "likert-grid-item"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LikertGridItem, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LikertGridItem, "properties", {
        get: function () {
            return {
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
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LikertGridItem, "events", {
        get: function () {
            return [{
                    "name": "internalUpdated",
                    "method": "internalUpdated",
                    "bubbles": true,
                    "cancelable": true,
                    "composed": true
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LikertGridItem, "style", {
        get: function () { return ":host{--bg-color:white}:host .lg-choices.no-show{display:none}:host .likert-grid-item{display:grid;grid-template-columns:1fr 3fr;grid-gap:1rem}:host .lg-choices{list-style:none;margin:0;padding:0;grid-column:2/3;display:-webkit-box;display:-ms-flexbox;display:flex}:host .lg-choices li{margin:0 10px;-webkit-box-flex:1;-ms-flex:1;flex:1}:host .lg-answer-subject{padding:6px;background-color:var(--bg-color);grid-column:1/2;min-width:150px}:host .lg-answer-group{background-color:var(--bg-color);list-style:none;margin:0;padding:5px;grid-column:2/3;display:-webkit-box;display:-ms-flexbox;display:flex;justify-items:center}:host .lg-answer-group input{-ms-flex-preferred-size:100px;flex-basis:100px;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;min-width:100px}"; },
        enumerable: true,
        configurable: true
    });
    return LikertGridItem;
}());
export { LikertGrid, LikertGridItem };
