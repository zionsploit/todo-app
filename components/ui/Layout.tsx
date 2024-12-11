import { ReactNode } from "react";
import ApplicationProvider from "../Provider/ApplicationProvider";

export default (params: { children: ReactNode }) => {

    return <>
        <ApplicationProvider>
            { params.children }
        </ApplicationProvider>
    </>
}