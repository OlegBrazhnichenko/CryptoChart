const colors = [
    "#252525",
    "#525252",
    "#737373",
    "#969696",
    "#bdbdbd",
    "#d9d9d9",
    "#f0f0f0"
];
const charcoal = "#252525";
const grey = "#969696";

// Typography
const sansSerif =
    "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 14;

// Layout
const baseProps = {
    width: 1000,
    height: 450,
    padding: 50,
    colorScale: colors
};

// Labels
const baseLabelStyles = {
    fontFamily: sansSerif,
    fontSize,
    letterSpacing,
    padding: 10,
    fill: "#fff",
    stroke: "transparent"
};
const centeredLabelStyles = { textAnchor: "middle", ...baseLabelStyles };

// Strokes
const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

// Put it all together...
const darkTheme = {
    area: {
            style: {
                data: {
                    fill: charcoal
                },
                labels: centeredLabelStyles
            },
            ...baseProps
        },
    axis:
        {
            style: {
                axis: {
                    fill: "transparent",
                    stroke: "#34305E",
                    strokeWidth: 1,
                    strokeLinecap,
                    strokeLinejoin
                },
                axisLabel: {...centeredLabelStyles, padding: 25},
                grid: {
                    fill: "none",
                    stroke: "#34305E",
                    strokeLinecap,
                    strokeLinejoin,
                    pointerEvents: "painted"
                },
                ticks: {
                    fill: "transparent",
                    size: 1,
                    stroke: "transparent"
                },
                tickLabels: baseLabelStyles
            },
            ...baseProps
        },
    bar:
        {
            style: {
                data: {
                    fill: charcoal,
                    padding: 8,
                    strokeWidth: 0
                },
                labels: baseLabelStyles
            },
            ...baseProps
        },

    boxplot:
        {
            style: {
                max: {
                    padding: 8,
                    stroke: charcoal,
                    strokeWidth: 1
                },
                maxLabels: baseLabelStyles,
                median: {
                    padding: 8,
                    stroke: charcoal,
                    strokeWidth: 1
                },
                medianLabels: baseLabelStyles,
                min: {
                    padding: 8,
                    stroke: charcoal,
                    strokeWidth: 1
                },
                minLabels: baseLabelStyles,
                q1: {
                    padding: 8,
                    fill: grey
                },
                q1Labels: baseLabelStyles,
                q3: {
                    padding: 8,
                    fill: grey
                },
                q3Labels: baseLabelStyles
            },
            boxWidth: 20,
            ...baseProps
        },
    candlestick:
        {
            style: {
                data: {
                    stroke: charcoal,
                    strokeWidth: 1
                },
                labels: centeredLabelStyles
            },
            candleColors: {
                positive: "#ffffff",
                negative: charcoal
            },
            ...baseProps
        },
    chart: baseProps,
    errorbar:
        {
            borderWidth: 8,
            style: {
                data: {
                    fill: "transparent",
                    stroke: charcoal,
                    strokeWidth: 2
                },
                labels: centeredLabelStyles
            },
            ...baseProps
        },
    group:
        {
            colorScale: colors,
            ...baseProps
        },
    legend: {
        colorScale: colors,
        gutter: 10,
        orientation: "vertical",
        titleOrientation: "top",
        style: {
            data: {
                type: "circle"
            },
            labels: baseLabelStyles,
            title: {...baseLabelStyles,  padding: 5}
        }
    },
    line:
        {
            style: {
                data: {
                    fill: "transparent",
                    stroke: charcoal,
                    strokeWidth: 2
                },
                labels: centeredLabelStyles
            },
            ...baseProps
        },
    pie: {
        style: {
            data: {
                padding: 10,
                stroke: "transparent",
                strokeWidth: 1
            },
            labels: {...baseLabelStyles, padding: 20}
        },
        colorScale: colors,
        width: 400,
        height: 400,
        padding: 50
    },
    scatter:
        {
            style: {
                data: {
                    fill: charcoal,
                    stroke: "transparent",
                    strokeWidth: 0
                },
                labels: centeredLabelStyles
            },
            ...baseProps
        },


    stack:
        {
            colorScale: colors,
            ...baseProps
        },
    tooltip: {
        style: {...centeredLabelStyles, padding: 5, pointerEvents: "none"},
        flyoutStyle: {
            stroke: charcoal,
            strokeWidth: 1,
            fill: "#f0f0f0",
            pointerEvents: "none"
        },
        cornerRadius: 5,
        pointerLength: 10
    },
    voronoi:
        {
            style: {
                data: {
                    fill: "transparent",
                    stroke: "transparent",
                    strokeWidth: 0
                },
                labels: {...centeredLabelStyles, padding: 5, pointerEvents: "none"},
                flyout: {
                    stroke: charcoal,
                    strokeWidth: 1,
                    fill: "#f0f0f0",
                    pointerEvents: "none"
                }
            },
            ...baseProps
        }
};

export default darkTheme;
