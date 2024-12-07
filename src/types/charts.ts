import { ReactNode } from "react";

export interface BarChartProps {
  data: { name: string; value: number }[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: ReadonlyArray<string>;
}

export interface BarData {
  name: string;
  value: number;
}

export interface PieChartProps {
  data: { name: string; value: number }[];
  width?: number;
  height?: number;
  colors?: ReadonlyArray<string>;
}

export interface ChartContainerProps {
  children: ReactNode;
  dimensions: {
    width: number;
    height: number;
  };
}
