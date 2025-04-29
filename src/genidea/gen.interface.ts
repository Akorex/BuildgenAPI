import { Schema } from "mongoose";

export enum CreatorProfile {
  SOLO = "solo",
  TEAM = "team",
  NON_TECHNICAL = "non_technical",
  HOBBYIST = "hobbyist",
  ENTREPRENEUR = "entrepreneur",
}

export enum TimeSpan {
  ONE_DAY = "1_day",
  THREE_DAYS = "3_days",
  ONE_WEEK = "1_week",
  TWO_WEEKS = "2_weeks",
  ONE_MONTH = "1_month",
  THREE_MONTHS = "3_months",
  SIX_MONTHS = "6_months",
}

export interface genDTO {
  category: string;
  creatorProfile: CreatorProfile;
  timeSpan: TimeSpan;
}

interface TechStack {
  frontend: string;
  backend: string;
  auth: string;
  ai: string;
  deployment: string;
}

export const TaskSchema: Schema = new Schema({
  taskName: { type: String, required: true },
  tool: { type: String, required: true },
  estimatedTime: { type: String, required: true },
});
