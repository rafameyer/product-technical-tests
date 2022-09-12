interface ILocationFromData {
  lat: number;
  lon: number;
}

interface IBoutiques {
  location: ILocationFromData;
}

export type { ILocationFromData, IBoutiques };
