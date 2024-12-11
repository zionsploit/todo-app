import { ApplicationProvider } from "@ui-kitten/components"
import { ReactNode } from "react"
import * as eva from '@eva-design/eva'

export default ({ children }: { children: ReactNode }) => {

    return <>
        <ApplicationProvider { ...eva } theme={eva.light}>
            { children }
        </ApplicationProvider>
    </>
}