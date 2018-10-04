import { Component, Prop, State, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "likert-grid",
  styleUrl: "likert-grid.scss",
  shadow: true
})
export class LikertGrid {
  @Prop()
  setSubjects: string = "";

  @Prop()
  setChoices: string = "";

  @Prop({ mutable: true })
  subjects: string[] = [];

  @Prop({ mutable: true })
  choices: string[] = [];

  @State()
  data: Object = {};

  @Event()
  updated: EventEmitter;

  @Event()
  setup: EventEmitter;

  componentWillLoad() {
    //init the subjects and choices
    this.subjects = this.setSubjects.split(",").map(this.removeLeadingSpaces);
    this.choices = this.setChoices
      .replace(" ", "")
      .split(",")
      .map(this.removeLeadingSpaces);

    this.setup.emit();
  }

  componentDidLoad() {}

  removeLeadingSpaces(str) {
    if (str.indexOf(" ") === 0) {
      str = str.slice(1);
    }

    return str;
  }

  onItemUpdated(ce: CustomEvent) {
    const answerIndex: number = ce.detail.answers.indexOf(true);

    //this is the data that will be available publicly
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
      return (
        <likert-grid-item
          onInternalUpdated={this.onItemUpdated.bind(this)}
          subject={subject}
          choices={this.choices}
          show-choices={i === 0 ? "true" : "false"}
        />
      );
    });
  }

  render() {
    return <div class="likert-grid">{this.buildGridItems()}</div>;
  }
}
