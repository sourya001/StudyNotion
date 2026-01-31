import { apiConnector } from "../apiConnector";
import { chatEndpoints } from "../apis";

const { CHAT_API } = chatEndpoints;

export async function sendChatMessage(messages, userRole) {
  try {
    const response = await apiConnector("POST", CHAT_API, { messages, userRole });
    return response.data;
  } catch (error) {
    throw error;
  }
}
