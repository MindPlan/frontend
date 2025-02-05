import { StatusEnum } from './status.enum.ts';
import { PriorityEnum } from './priority.enum.ts';

export type CreateTaskType = {
  title: string;
  description: string;
  priority: PriorityEnum;
  status: StatusEnum;
  group: number[];
  'start_date': Date;
  'end_date': Date;
}
