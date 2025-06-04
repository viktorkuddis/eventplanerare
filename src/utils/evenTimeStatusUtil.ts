// KOLLAR OM HÄNDELSE ÄR PÅGÅENDE

export function isEventActive(startTimeStr: string | number | Date, endTimeStr: string | number | Date) {
    // console.log("Jämförelse sker...(lokkar om event pågår)")

    const now = new Date();
    const start = new Date(startTimeStr)
    const end = new Date(endTimeStr)

    // console.log("start från datan: ", startTimeStr)
    // console.log("start som dateobjekt:", start)
    // console.log("end från datan: ", endTimeStr)
    // console.log("end som dateobjekt:", end)

    // är NU efter startdatum och innan slutdatum? isåfall pågår det.
    const isOngoing = now >= start && now <= end;

    // console.log("pågår?", isOngoing)

    return isOngoing
}



// KOLLA OM HÄNDELSE LIGGER I FRAMTIDEN
export function isEventInFuture(startTimeStr: string | number | Date) {
    console.log("Jämförelse sker...(kollar om event ligger i framtiden)");

    const now = new Date();
    const start = new Date(startTimeStr);

    console.log("start från datan: ", startTimeStr);
    console.log("start som dateobjekt:", start);
    console.log("nuvarande tid:", now);

    // Är NU före startdatumet? Isåfall ligger det i framtiden.
    const isInFuture = now < start;

    console.log("i framtiden?", isInFuture);

    return isInFuture;
}

// KOLLA OM HÄNDELSE ÄR ÖVER
export function isEventOver(endTimeStr: string | number | Date): boolean {
    console.log("Jämförelse sker...(kollar om event är över)");

    const now = new Date();
    const end = new Date(endTimeStr);

    console.log("end från datan: ", endTimeStr);
    console.log("end som dateobjekt:", end);
    console.log("nuvarande tid:", now);


    // Är NU efter slutdatumet? Isåfall är det över.
    const isOver = now > end;

    console.log("över?", isOver);

    return isOver;
}