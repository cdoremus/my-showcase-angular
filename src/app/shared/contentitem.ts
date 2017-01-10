import { User } from './user';

export interface ContentItem {
    itemId: number;
    title: string;
    description: string;
    filename: string;
    height: number;
    width: number;
    user: User;
    createDate: string;
}
