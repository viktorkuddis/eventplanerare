export type EventType = {
    _id: string | undefined
    title: string,
    description: string,
    color: string,
    start: Date
    end: Date,
    location: string,
    ownerUserAuthId: string | null | undefined,
}