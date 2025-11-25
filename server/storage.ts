import type { ChatSession, UserState, Admin, AdminSession } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createSession(user1Id: string, user2Id: string): Promise<ChatSession>;
  getSession(sessionId: string): Promise<ChatSession | undefined>;
  endSession(sessionId: string): Promise<void>;
  getUserState(userId: string): Promise<UserState | undefined>;
  setUserState(userId: string, state: UserState): Promise<void>;
  removeUserState(userId: string): Promise<void>;
  getAllWaitingUsers(): Promise<UserState[]>;
  // Admin methods
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdminSession(adminId: string): Promise<AdminSession>;
  getAdminSession(token: string): Promise<AdminSession | undefined>;
  getInterests(): Promise<string[]>;
  setInterests(interests: string[]): Promise<void>;
}

export class MemStorage implements IStorage {
  private sessions: Map<string, ChatSession>;
  private userStates: Map<string, UserState>;
  private adminSessions: Map<string, AdminSession>;
  private admins: Map<string, Admin>;
  private interests: string[];

  constructor() {
    this.sessions = new Map();
    this.userStates = new Map();
    this.adminSessions = new Map();
    this.admins = new Map();
    this.interests = [
      'Gaming', 'Music', 'Movies', 'Sports', 'Travel', 'Tech', 'Art', 'Books',
      'Fitness', 'Food', 'Photography', 'Cooking', 'Fashion', 'DIY', 'Pets',
      'Crypto', 'Business', 'Science', 'History', 'Comedy',
    ];
    
    // Initialize default admin (username: admin, password: admin123)
    this.admins.set('admin', {
      id: 'admin-1',
      username: 'admin',
      passwordHash: 'admin123', // In production, use proper hashing
    });
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

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return this.admins.get(username);
  }

  async createAdminSession(adminId: string): Promise<AdminSession> {
    const session: AdminSession = {
      id: randomUUID(),
      adminId,
      token: randomUUID(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    this.adminSessions.set(session.token, session);
    return session;
  }

  async getAdminSession(token: string): Promise<AdminSession | undefined> {
    const session = this.adminSessions.get(token);
    if (session && session.expiresAt > Date.now()) {
      return session;
    }
    if (session) {
      this.adminSessions.delete(token);
    }
    return undefined;
  }

  async getInterests(): Promise<string[]> {
    return [...this.interests];
  }

  async setInterests(interests: string[]): Promise<void> {
    this.interests = [...interests];
  }
}

export const storage = new MemStorage();
