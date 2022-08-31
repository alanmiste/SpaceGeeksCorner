export type UserItemType = {
    explanation: string,
    title: string,
    url: string,
}

export type SavedUserItemType = {
    id: string,
    username: string,
    explanation: string,
    title: string,
    url: string,
}

export type UserItemToSave = Omit<SavedUserItemType, "id">
