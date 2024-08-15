import React from "react"

interface resultProps {
    details: {c:Number, h:Number, l:Number}
}

export const Resultbox:React.FC<resultProps> = ({details}) => {
    return(
        <div className="h-[14rem] w-full border p-10 rounded-md">
                <h3 className="text-right font-semibold text-lg text-[#028A0f]">
                    Results
                </h3>
                <div className="mt-5 flex flex-col gap-4">
                    <p className=" font-medium">Current Price: {details.c.toFixed(2)}</p>
                    <p className=" font-medium">High Price of the day: {details.h.toFixed(2)}</p>
                    <p className=" font-medium">Low price of the day: {details.l.toFixed(2)}</p>

                </div>
        </div>
    )
}