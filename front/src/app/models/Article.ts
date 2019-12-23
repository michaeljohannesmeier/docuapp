


export class Article {
    title: String;
    category1: String;
    category2: String;
    examples: Example[];

    constructor(title, category1, category2, examples) {
        this.title = title,
        this.category1 = category1,
        this.category2 = category2,
        this.examples = examples
    }

}
