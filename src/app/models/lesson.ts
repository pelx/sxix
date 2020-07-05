export class Lesson {
  constructor(
    public id: string,
    public track: number,
    public name: string,
    public teacher: string,
    public topic: string,
    public duration: string,
    public segment: string,
    public year: number,
    public url: string,
    public type: string,
    public tag: string[]
  ) {}
}
