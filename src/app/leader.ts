export class Leader {
  id: number;
  name: string;
  activ: boolean;
  // avatar: string;

  constructor(id: number, name: string, activ: boolean ) {
    this.id = id;
    this.name = name;
    this.activ = activ;
  }

  public getActiv(): boolean {
    return this.activ;
  }
}
