export class Note {
    constructor(
        public noteId: string,
        public lessonId: string,
        public lessonTitle: string,
        public note: string,
        public createdOn: Date,
        public updatedOn: Date,
        public userId: string
    ) { }
}
