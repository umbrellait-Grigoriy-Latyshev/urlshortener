export interface URLMessage {
  url: string;
  success: boolean;
}

export interface StatusMessage {
  success: boolean;
  message?: string;
}

export interface CreateShortURLMessage {
  url: string;
  suggested?: string;
}
