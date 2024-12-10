import { memo, } from "react";

import { ChartContainerProps } from "@/types/charts";

export const ChartContainer = memo(function ChartContainer({ children, dimensions }: ChartContainerProps) {
    return (
        <div className="w-full max-w-[1200px] mx-auto">
            <svg
                width={dimensions.width}
                height={dimensions.height}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                className="w-full h-auto block"
                preserveAspectRatio="xMidYMid meet"
            >
                {children}
            </svg>
        </div>
    );
});
