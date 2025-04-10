import { Request } from 'express';

export interface Apartment {
  id: number;
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}

/**
 * Custom Express Request Type to include `apartments` array
 */
export interface ApartmentRequest extends Request {
  apartments?: Apartment[];
}

// For a single apartment request
export interface SingleApartmentRequest extends Request {
  apartment?: Apartment;
}