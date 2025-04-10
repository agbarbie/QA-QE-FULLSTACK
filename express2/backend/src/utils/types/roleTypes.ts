import { Request } from "express";

export interface Manager {
  id: number;
  name: string;
  email: string;
  password: string;
}

/**
 * Custom Express Request Type to include `managers` array
 */
export interface ManagerRequest extends Request {
  managers?: Manager[];
}

// For a single manager request
export interface SingleManagerRequest extends Request {
  manager?: Manager;
}
