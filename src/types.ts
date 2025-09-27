export type EventType = {
    _id: string | undefined
    title: string,
    description: string,
    color: string,
    start: Date
    end: Date,
    connectionCode: string,
    location: string,
    ownerUserAuthId: string | null | undefined,
}

export type EventActivityType = {
    eventId: string;          // MongoDB ObjectId som string
    title: string;
    description?: string;     // beskrivning är valfri (kan saknas)
    startTime: Date;
    endTime?: Date;           // kan vara undefined
    createdAt?: string;       // timestamps lägger till createdAt och updatedAt som ISO-strängar
    updatedAt?: string;
};

export type EventParticipationType = {
    _id?: string;             // MongoDB _id som string, valfri
    userId: string;
    eventId: string;          // MongoDB ObjectId som string
    role?: "guest" | "host";  // enum, default är "guest"
    arrivalTime?: Date;
    departureTime?: Date;
    createdAt?: string;       // timestamps, valfria
    updatedAt?: string;
};


export type PersonalActivityType = {
    _id?: string;               // MongoDB _id som string, valfri
    ownerUserAuthId: string;
    eventId: string;            // MongoDB ObjectId som string
    title: string;
    description?: string;       // valfri
    startTime: Date;
    endTime?: Date;             // valfri
    createdAt?: string;         // timestamps, valfria
    updatedAt?: string;
};

export type RequestType = {
    _id?: string;  // valfri MongoDB _id

    from: {
        userAuthId: string;
    },
    to: {
        type: "event" | "user";
        id: unknown;    // mixad typ - kan vara string, number, objekt etc.
    };

    intention: "joinEvent" | "inviteToEvent";

    relatedId: unknown;  // mixad typ, beroende på intention

    status: "pending" | "accepted" | "rejected";



    createdAt?: string;
    updatedAt?: string;
};


// ----
export type SimplifiedUserType = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
    notFound: boolean;
};

export type EventObjectsDetailedType = {
    event: EventType;
    // Lista över deltaganden, varje deltagande är berikat med förenklad användardata
    eventParticipationsEnriched: (EventParticipationType & { user: SimplifiedUserType; })[];
    eventActivities: EventActivityType[];
    personalActivities: PersonalActivityType[];

};


export type NotificationItemType = {
    _id?: string;
    textAsHtml: string;
    date: Date;
    url: string;
};

export type DateBannerType = {
    startTime: Date
}