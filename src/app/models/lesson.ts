export class Lesson {
  constructor(
    public id: number,
    public track: number,
    public name: string,
    public teacher: string,
    public topic: string,
    public duration: number,
    public segment: string,
    public year: number,
    public url: string,
    public type: string
  ) {}
}
