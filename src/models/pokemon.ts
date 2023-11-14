// export default class Pokemon {
//     // 1. Typage des propiétés d'un pokémon.
//     id: number;
//     hp: number;
//     cp: number;
//     name: string;
//     picture: string;
//     types: Array<string>;
//     created: Date;

//     // 2. Définition des valeurs par défaut des propriétés d'un pokémon.
//     constructor(
//      id: number,
//      hp: number = 100,
//      cp: number = 10,
//      name: string = 'name',
//      picture: string = 'http://...',
//      types: Array<string> = ['Normal'],
//      created: Date = new Date()
//     ) {
//      // 3. Initialisation des propiétés d'un pokémons.
//      this.id = id;
//      this.hp = hp;
//      this.cp = cp;
//      this.name = name;
//      this.picture = picture;
//      this.types = types;
//      this.created = created;
//     }
//    }


// version plus moderne
export default class Pokemon {
  constructor(
    public id: number,
    public hp: number = 100,
    public cp: number = 10,
    public name: string = "name",
    public picture: string = "http://...",
    public types: string[] = ["Normal"],
    public created: Date = new Date()
  ) {}
}
