export class Note {
    constructor(
        public noteId: number,
        public lessonId: string,
        public lessonTitle: string,
        public note: string,
        public createdOn: Date,
        public updatedOn: Date,
        public userId: string
    ) { }
}
