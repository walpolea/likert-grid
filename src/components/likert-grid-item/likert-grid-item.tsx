import { Component, Prop, State, Event, EventEmitter, Element } from "@stencil/core";

@Component({
  tag: "likert-grid-item",
  styleUrl: "likert-grid-item.scss",
  shadow: true
})
export class LikertGridItem {
  @Prop()
  subject: string = "Napkins";

  @Prop()
  choices: string[] = [];

  @Prop()
  showChoices: boolean = true;

  @State()
  data: Object = {};

  @Event()
  internalUpdated: EventEmitter;

  @Element()
  el: HTMLElement;

  answerEls: HTMLElement[];

  NodeListtoArray(obj) {
    var array = [];
    for (var i = obj.length >>> 0; i--; ) {
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

    //construct all the data that needs to go to the main grid, this can be proprietary
    this.data["subject"] = this.subject;
    this.data["answers"] = answers;
    this.updateHandler();
  }

  updateHandler() {
    this.internalUpdated.emit(this.data);
  }

  buildChoices() {
    const choicesArray = this.choices.map(this.buildChoice);
    return <ul class={"lg-choices" + (this.showChoices ? " show" : " no-show")}>{choicesArray}</ul>;
  }

  buildChoice(choice) {
    return <li class="lg-choice">{choice}</li>;
  }

  buildSubject() {
    return <article class="lg-answer-subject">{this.subject}</article>;
  }

  buildAnswers() {
    const answersArray = this.choices.map(() => {
      return this.buildAnswer(this.subject);
    });
    return <section class="lg-answer-group">{answersArray}</section>;
  }

  buildAnswer(subject) {
    subject = subject.toLowerCase();
    subject = subject.replace(" ", "-");
    return <input class="lg-answer" type="radio" name={subject} />;
  }

  render() {
    return (
      <div class="likert-grid-item">
        {this.buildChoices()}
        {this.buildSubject()}
        {this.buildAnswers()}
      </div>
    );
  }
}
