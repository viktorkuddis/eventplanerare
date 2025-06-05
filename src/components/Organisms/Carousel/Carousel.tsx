
import type { ReactNode } from "react"
import styles from "./Carousel.module.css"

type Props = {
    items: ReactNode[] | undefined //ifall items inte finns.,
    width: number,
    aspectRatioH: number,
    aspectRatioW: number,
    paddingX: string
    gap: string
    firstItemWidth: number | null
}

//  *** INSTRUKTIONER ***************
// Skicka in färdiga HTMLNoder i en arrays som items här.
// width är bredden på varje kort räknat i antal kolumner med en bas på 12 som fullbredd.

// **********************************


const Carousel = ({ items, width, paddingX, gap, firstItemWidth, aspectRatioH, aspectRatioW }: Props) => {

    const carouselItems = items || [];

    // variabel för att testa om hur de ser ut om ingen data fanns
    // carouselItems = [];

    const amoundOfCardsInView = 12 / width;

    // exempel 12 / 3 == 4
    // 4 * 3 = 12  ... Innebär att det kommer synas 4 kort om varje kor sträcker sig över 3 kolumner.
    // visualisering:
    // |                                  |
    // |[1-2-3] [4-5-6] [7-8-9] [10-11-12]|
    // |                                  |

    // exempel 12 / 5 == 2.4
    // 2.4 * 5 = 12  ... Innebär att det kommer synas 2.4 kort om varje kor sträcker sig över 5 kolumner.
    // visualisering:
    // |                               |
    // |[1-2-3-4-5] [6-7-8-9-10] [11-12|13-14-15]
    // |                               |

    // liknande operation om de första kortet ska ha avvikande bredd:
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
                            // sätter kortets bredd:
                            // - Vi räknar med den containerns totala bredd inklusive containerns padding,
                            // - delar den med antalet kort, och drar sedan bort gapet från varje kort.
                            // - vi räknar bara med 1 antal gap eftersom de är 1 korts bredd som räknas ut här.
                            width: i === 0 && firstItemWidth
                                ? `calc((100% + ${gap}) / ${firstItemWidth} - ${gap})`
                                : `calc((100% + ${gap}) / ${amoundOfCardsInView} - ${gap})`,
                            aspectRatio: aspectRatioW && aspectRatioH ? `${aspectRatioW}/${aspectRatioH}` : undefined,
                        }}>
                        {item}
                    </div>)
            }

        </div >
    )
}

export default Carousel