
import type { ReactNode } from "react"
import styles from "./Carousel.module.css"

type Props = {
    items: ReactNode[] | undefined //ifall items inte finns.
}

//  *** INSTRUKTIONER ***************
// Skicka in färdiga HTMLNoder i en arrays som items här.
// **********************************


const Carousel = ({ items }: Props) => {

    const carouselItems = items || [];

    // variabel för att testa om hur de ser ut om ingen data fanns
    // carouselItems = [];

    // stilparametrar:
    const paddingX = "1rem";
    const gap = "0.5rem"


    const columnAmount = 12 / 11

    console.log(items)

    return (
        <div className={styles.carouselContainer}

            style={{
                paddingLeft: paddingX,
                paddingRight: paddingX,
                gap: gap,
            }}>

            {/*renderar varje item  */}
            {carouselItems.map(
                (item, i) =>
                    <div
                        key={i}
                        className={styles.itemContainer}
                        style={{
                            // Den mest pålitliga beräkningen för att få exakt 'numVisibleItems' synliga kort
                            // när padding och gap finns på containern.
                            // Vi räknar med den totala bredden inklusive containerns padding,
                            // delar den med antalet kort, och drar sedan bort gapet från varje kort.
                            width: `calc((100% + ${gap}) / ${columnAmount} - ${gap})`
                        }}>
                        {item}
                    </div>)
            }

        </div >
    )
}

export default Carousel