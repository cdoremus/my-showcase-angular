import { User, defaultUser } from './user';

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

export const defaultContentItem: ContentItem = {
    itemId: 0,
    title: '',
    description: '',
    filename: '',
    height: 0,
    width: 0,
    createDate: undefined,
    user: defaultUser
};
