

// [] Hämta den specifika notisen 
// [] om den är förfrågan om event och join event. visa jiun event kort. med actions.
// [] om den är pending kan man klicka ja eller nej. 
// [] om den är avslagen står det att den är avslagen och du kan acceptera den
// [] om den är accepterad kan du klicka avslagen 

// [] TESTA HUR DE TER SIG NÄR MAN SKA FÖRSÖKA GÖRA EN FÖRFRÅGAN TILL SAMMA EVENT OCH DEN ÄR ANTINGEN PENDING; AVSLAGEN ELLER ACCEPTERAD. KAN JAG DÅ GÖRA FÅRFÅRGNINGAR ? 


import { useContext, useEffect, useState } from "react";
import { useDbApi } from "../../../api/useDbApi";
import type { EventType, RequestType, SimplifiedUserType } from "../../../types";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
// import { useUser } from '@clerk/clerk-react'; // Importera useUser





const RequestDetails = () => {



    const { requestId } = useParams();


    const [requestObjekt, setRequestObject] = useState<RequestType>()

    const [fromUser, setFromUser] = useState<SimplifiedUserType>()

    const [actualEvent, setActualEvent] = useState<EventType>()

    const [isLoading, setIsLoading] = useState(true)

    const contex = useContext(AppContext)


    const { getRequest, getUsersByIdList } = useDbApi();


    useEffect(() => {

        if (requestId) {
            (async () => {
                const request: RequestType = await getRequest(requestId);

                // console.log("hämmtar vem som skickade förfrågan...")
                const foundUser = await getUsersByIdList([request.from.userAuthId])
                console.log("hittat vem som skickade förfrågan... ", foundUser[0])


                // OM DET ÄR ETT JOIN EVENT REQUEST:
                // todo: detta kan va ett case switch iställer om de finns fler olika request i framtiden 
                if (request.intention == "joinEvent") {
                    console.log("intentionen är att joina event :) ")
                    const event = (contex?.allEvents.find((e) => (e._id == request.to.id)))

                    // sätter states:
                    setRequestObject(request)
                    setActualEvent(event)
                    // den returnerar enlista men här blir det ju bara 1 :) 
                    setFromUser(foundUser[0])
                    setIsLoading(false)

                }




            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contex]);





    return (
        <>
            {isLoading
                ?
                "laddar"
                :
                <>
                    {requestObjekt?.intention == "joinEvent" &&
                        <div>

                            <p><strong>@{fromUser?.username}</strong> vill ansluta till ditt event<strong>@{actualEvent?.title}</strong> </p>
                            <small>
                                <p>{new Date(requestObjekt.createdAt as string).toLocaleString('sv-SE', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</p></small>
                        </div>
                    }
                </>
            }
        </>



    )
}

export default RequestDetails
