export type TshirtToSave = {
    color: string,
    size: string,
    mockupUrl: string,
    placement: string,
}

export type TshirtWithUsername = {
    username: string,
    tshirtToSave: TshirtToSave,
}
