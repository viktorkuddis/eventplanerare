
import type { ReactNode } from "react"
import styles from "./Carousel.module.css"

type Props = {
    items: ReactNode[] | undefined //ifall items inte finns.,
    width: number,
    paddingX: string
    gap: string
    firstItemWidth: number | null
}

//  *** INSTRUKTIONER ***************
// Skicka in färdiga HTMLNoder i en arrays som items här.
// width är bredden på varje kort räknat i altal kolumner med en bas på 12 som fullbredd.

// **********************************


const Carousel = ({ items, width, paddingX, gap, firstItemWidth }: Props) => {

    const carouselItems = items || [];

    // variabel för att testa om hur de ser ut om ingen data fanns
    // carouselItems = [];

    width = 12 / width;

    if (firstItemWidth) firstItemWidth = 12 / firstItemWidth;


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
                            width: i === 0 && firstItemWidth
                                ? `calc((100% + ${gap}) / ${firstItemWidth} - ${gap})`
                                : `calc((100% + ${gap}) / ${width} - ${gap})`,
                        }}>
                        {item}
                    </div>)
            }

        </div >
    )
}

export default Carousel