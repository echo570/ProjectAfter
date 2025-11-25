import type { ChatSession, UserState } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createSession(user1Id: string, user2Id: string): Promise<ChatSession>;
  getSession(sessionId: string): Promise<ChatSession | undefined>;
  endSession(sessionId: string): Promise<void>;
  getUserState(userId: string): Promise<UserState | undefined>;
  setUserState(userId: string, state: UserState): Promise<void>;
  removeUserState(userId: string): Promise<void>;
  getAllWaitingUsers(): Promise<UserState[]>;
}

export class MemStorage implements IStorage {
  private sessions: Map<string, ChatSession>;
  private userStates: Map<string, UserState>;

  constructor() {
    this.sessions = new Map();
    this.userStates = new Map();
  }

  async createSession(user1Id: string, user2Id: string): Promise<ChatSession> {
    const session: ChatSession = {
      id: randomUUID(),
      user1Id,
      user2Id,
      status: 'active',
      startedAt: Date.now(),
      endedAt: null,
    };
    this.sessions.set(session.id, session);
    return session;
  }

  async getSession(sessionId: string): Promise<ChatSession | undefined> {
    return this.sessions.get(sessionId);
  }

  async endSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.status = 'ended';
      session.endedAt = Date.now();
    }
  }

  async getUserState(userId: string): Promise<UserState | undefined> {
    return this.userStates.get(userId);
  }

  async setUserState(userId: string, state: UserState): Promise<void> {
    this.userStates.set(userId, state);
  }

  async removeUserState(userId: string): Promise<void> {
    this.userStates.delete(userId);
  }

  async getAllWaitingUsers(): Promise<UserState[]> {
    return Array.from(this.userStates.values()).filter(
      (state) => state.status === 'waiting'
    );
  }
}

export const storage = new MemStorage();
