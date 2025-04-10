export interface homes{
    id: number;
    name: string;
    city: string;
    state: string;
    photo: string;
    availableUnits: number;
    wifi: boolean;
    laundry: boolean;
  }
  export interface manager {
    id: number;
    name: string;
    email: string;
    password: string;
  }