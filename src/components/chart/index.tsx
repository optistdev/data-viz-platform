import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
  CategoryScale,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { useState, useMemo, useRef, useEffect } from "react";
import { startOfWeek } from "date-fns";
import ChartTooltip from "./Tooltip";
import { generateChartData } from "@/utils/mock";

// ----------------------
// Plugin: Hover Dashed Line on Hovered Point
// ----------------------
const hoverDashedLinePlugin = {
  id: "hoverDashedLinePlugin" as const,
  afterDatasetsDraw(chart: any) {
    const active = chart.getActiveElements?.()[0];
    if (!active) return;

    const { ctx, scales } = chart;
    const x = active.element.x;

    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#C8E972";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, scales.y.top);
    ctx.lineTo(x, scales.y.bottom);
    ctx.stroke();
    ctx.restore();
  },
};

// ----------------------
// Plugin: Vertical Underline Grid (Weekly Interpolation)
// ----------------------
const underLineGridPlugin = {
  id: "underLineGridPlugin" as const,
  afterDatasetsDraw(chart: any) {
    const { ctx, scales } = chart;
    const xScale = scales.x;
    const yScale = scales.y;
    const points = chart.getDatasetMeta(0).data;

    let currentDate = startOfWeek(new Date(xScale.min), { weekStartsOn: 1 });
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    let lastX = -Infinity;

    ctx.save();
    ctx.setLineDash([]);
    ctx.strokeStyle = "rgba(200, 233, 114, 0.12)";
    ctx.lineWidth = 3.5;

    for (let guard = 0; guard < 100 && currentDate <= new Date(xScale.max); guard++) {
      const x = xScale.getPixelForValue(currentDate);
      if (Math.abs(x - lastX) >= 20) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          if (p1.x <= x && x <= p2.x) {
            const y = p1.y + ((x - p1.x) / (p2.x - p1.x)) * (p2.y - p1.y);
            ctx.beginPath();
            ctx.moveTo(x, yScale.bottom);
            ctx.lineTo(x, y);
            ctx.stroke();
            lastX = x;
            break;
          }
        }
      }
      currentDate = new Date(currentDate.getTime() + msPerWeek);
    }

    ctx.restore();
  },
};

// ----------------------
// Plugin: "Now" Marker with Label and Dot
// ----------------------
const nowMarkerPlugin = {
  id: "nowMarkerPlugin" as const,
  afterDatasetsDraw(chart: any) {
    const { ctx, scales, chartArea } = chart;
    const xScale = scales.x;
    const yScale = scales.y;
    const now = new Date();
    const nowX = xScale.getPixelForValue(now);

    if (nowX < chartArea.left || nowX > chartArea.right) return;

    const points = chart.getDatasetMeta(0).data;
    let y: number | null = null;

    // Interpolate Y for "Now"
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      if (p1.x <= nowX && nowX <= p2.x) {
        y = p1.y + ((nowX - p1.x) / (p2.x - p1.x)) * (p2.y - p1.y);
        break;
      }
    }

    // Draw vertical line
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#363637";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(nowX, yScale.top);
    ctx.lineTo(nowX, yScale.bottom);
    ctx.stroke();
    ctx.restore();

    // Draw circle + "Now" label
    if (y !== null) {
      ctx.beginPath();
      ctx.arc(nowX, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "#0e0d0d";
      ctx.strokeStyle = "#C8E972";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#ccc";
      ctx.fillText("Now", nowX, yScale.bottom + 20);
    }
  },
};

// Register plugins and chart components globally
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Filler,
  hoverDashedLinePlugin,
  underLineGridPlugin,
  nowMarkerPlugin
);

// ----------------------
// Chart Dataset
// ----------------------
const chartData = generateChartData();

const data: ChartData<"line"> = {
  labels: chartData.map((data) => data.date),
  datasets: [
    {
      label: "Revenue",
      data: chartData.map((data) => data.value),
      borderColor: "#C8E972",
      borderWidth: 2,
      tension: 0,
      fill: false,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointHoverBackgroundColor: "#0e0d0d",
      pointHoverBorderColor: "#C8E972",
    },
  ],
};

// ----------------------
// Chart Component
// ----------------------
export default function CustomLineChart() {
  const [tooltipState, setTooltipState] = useState({
    x: 0,
    y: 0,
    value: 0,
    visible: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Hide custom tooltip on mouse/pointer leave or click outside
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hideTooltip = () =>
      setTooltipState((prev) => ({ ...prev, visible: false }));

    const handleMouseLeave = () => hideTooltip();

    const handleWindowMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget || (e.relatedTarget as HTMLElement).nodeName === "HTML") {
        hideTooltip();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!container.contains(e.target as Node)) {
        hideTooltip();
      }
    };

    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseout", handleWindowMouseOut);
    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseout", handleWindowMouseOut);
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, []);

  // Chart options with custom tooltip handler
  const options = useMemo<ChartOptions<"line">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 600,
        easing: "easeOutCubic",
      },
      transitions: {
        active: { animation: { duration: 0 } },
      },
      elements: {
        point: {
          radius: 0,
          hoverRadius: 5,
          hoverBorderWidth: 2,
          hoverBorderColor: "#C8E972",
        },
        line: { tension: 0.3 },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          type: "time",
          time: { unit: "month", displayFormats: { month: "MMM" } },
          grid: { drawOnChartArea: false },
          ticks: { autoSkip: true, maxTicksLimit: 6 },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (val) => `$${(+val / 1000).toFixed(0)}K`,
            color: "#ccc",
          },
          grid: { color: "#333" },
        },
      },
      plugins: {
        tooltip: {
          enabled: false, // disable default tooltip
          external: (context) => {
            const tooltipModel = context.tooltip;
            const point = tooltipModel.dataPoints?.[0];

            if (!point) {
              setTooltipState((prev) => ({ ...prev, visible: false }));
              return;
            }

            const canvasRect = context.chart.canvas.getBoundingClientRect();

            setTooltipState({
              x: canvasRect.left + tooltipModel.caretX - 100,
              y: canvasRect.top + tooltipModel.caretY - 120,
              value: typeof point.raw === "number" ? point.raw : 0,
              visible: true,
            });
          },
        },
        legend: { display: false },
      },
    }),
    []
  );

  return (
    <div ref={containerRef} className="p-4 rounded-md mt-5">
      <div className="text-white w-full h-[150px] sm:h-50 md:h-[300px]">
        <Line data={data} options={options} />
        {tooltipState.visible && <ChartTooltip {...tooltipState} />}
      </div>
    </div>
  );
}
