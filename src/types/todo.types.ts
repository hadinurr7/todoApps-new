export interface TodoPayload {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in progress" | "done";
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
  status: "todo" | "in progress" | "done";
}

export interface CreateTodoWithAssigneePayload extends CreateTodoPayload {
  assigneeId: number;
}