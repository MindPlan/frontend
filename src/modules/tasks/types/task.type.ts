import { PriorityEnum } from './priority.enum.ts';

export type Task = {
  id: number;
  owner: number;
  title: string;
  description: string;
  priority: PriorityEnum;
  group: number;
  tag: number[];
  'start_date': Date;
  'end_date': Date;
}
