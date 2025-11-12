export type SyncStatus = 'synced' | 'pending' | 'deleted';

export type Task = {
  id: string; // local uuid
  title: string;
  description: string;
  status: boolean;
  completed: boolean;
  createdAt: string;      
  updatedAt: string;      
  syncStatus: SyncStatus; 
  remoteId?: number | null;
};

export enum SYNC_STATUS {
  SYNCED = 'synced',
  PENDING = 'pending',
  DELETED = 'deleted',
}