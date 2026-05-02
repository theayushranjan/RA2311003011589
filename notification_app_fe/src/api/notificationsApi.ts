import axios from 'axios';
import { Log } from '@/middleware/logger';

const API_BASE = "/api";

export interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

export const fetchToken = async (): Promise<string | null> => {
  try {
    const payload = {
      email: "ar1493@srmist.edu.in",
      name: "ayush ranjan",
      rollNo: "ra2311003011589",
      accessCode: "QkbpxH",
      clientID: "0251ecd7-a954-445a-a159-3896f073bd85",
      clientSecret: "TfnYCJXZpNfMtxWg",
    };

    const response = await axios.post(`${API_BASE}/auth`, payload);
    return response.data.access_token;
  } catch (error) {
    Log("frontend", "error", "api", `Fetch auth token failed: ${(error as Error).message}`);
    return null;
  }
};

export const fetchNotifications = async (
  token: string,
  params: { limit: number; page: number; notification_type?: string }
): Promise<Notification[]> => {
  try {
    const queryParams = new URLSearchParams({
      limit: params.limit.toString(),
      page: params.page.toString(),
    });
    
    if (params.notification_type && params.notification_type !== 'All') {
      queryParams.append('notification_type', params.notification_type);
    }

    const response = await axios.get(`${API_BASE}/notifications?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.notifications;
  } catch (error) {
    Log("frontend", "error", "api", `Fetch notifications failed: ${(error as Error).message}`);
    throw error;
  }
};

export const fetchAllNotifications = async (token: string): Promise<Notification[]> => {
  let page = 1;
  let all: Notification[] = [];
  
  while (true) {
    const notifications = await fetchNotifications(token, { limit: 10, page });
    all = [...all, ...notifications];
    if (notifications.length < 10) break;
    page++;
  }
  
  return all;
};
