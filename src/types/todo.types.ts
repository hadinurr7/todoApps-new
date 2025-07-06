export interface TodoPayload {
  id: number;
  title: string;
  description: string;
  status: string
  creatorId: number;
  assigneeId?: number;
}

export interface CreateTodoPayload {
  title: string;
  description: string;
  creatorId: number;
}

export interface UpdateStatusPayload {
  id: number;
  status: string
}

export interface CreateTodoWithAssigneePayload extends CreateTodoPayload {
  assigneeId: number;
}