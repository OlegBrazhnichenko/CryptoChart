import React, {Component} from "react";
import PropTypes from "prop-types"
import {
    Svg,
    Defs,
    RadialGradient,
    LinearGradient,
    Stop,
    Circle,
    Polygon
} from "react-native-svg";

export default class SvgTradeIcon extends Component {
    static propTypes = {
        diameter: PropTypes.number,
        direction: PropTypes.oneOf(["up","down"]).isRequired,
        connotation: PropTypes.oneOf(["positive","negative"]).isRequired,
    };

    static defaultProps = {
        diameter: 26,
    };

    constructor(props){
        super();

        // Define icon properties for different variants and pick one depending on props
        const {diameter, direction, connotation} = props;

        this.arrowDirection = {
            up: `${diameter*0.7},${diameter*0.6} ${diameter*0.5},${diameter*0.35} ${diameter*0.3},${diameter*0.6}`,
            down: `${diameter*0.3},${diameter*0.4} ${diameter*0.5},${diameter*0.65} ${diameter*0.7},${diameter*0.4}`,
        }[direction];

        this.connotation = {
            positive: {
                radialGradient: {
                    start: "#009695",
                    stop: "#009695",
                },
                linearGradient: {
                    start: "#00A4C9",
                    stop: "#009180",
                }
            },
            negative: {
                radialGradient: {
                    start: "#C7007F",
                    stop: "#C7007F",
                },
                linearGradient: {
                    start: "#C7007F",
                    stop: "#D50054",
                }
            }
        }[connotation];
    }

    render() {
        const {diameter} = this.props;
        const {radialGradient, linearGradient} = this.connotation;

        // random id used to prevent react-native-svg bug
        const randomId = Math.random();

        const commonProps = {cx: diameter / 2, cy: diameter / 2};

        return (
            <Svg height={diameter} width={diameter}>
                <Defs>
                    {/*Defining gradient for outer circle*/}
                    <RadialGradient
                        id={`radialGrad${randomId}`}
                        r={diameter / 2}
                        fx={diameter / 2}
                        fy={diameter / 2}
                        gradientUnits="userSpaceOnUse"
                        {...commonProps}
                    >
                        <Stop offset="0.6" stopColor={radialGradient.start} stopOpacity="0" />
                        <Stop offset="1" stopColor={radialGradient.stop} stopOpacity="0.35" />
                    </RadialGradient>

                    {/*Defining gradient for inner circle*/}
                    <LinearGradient id={`linearGrad${randomId}`} x1="0" y1="0" x2="0" y2="0.8">
                        <Stop offset="0" stopColor={linearGradient.start} stopOpacity="1" />
                        <Stop offset="1" stopColor={linearGradient.stop} stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                {/*outer circle*/}
                <Circle {...commonProps} r={diameter / 2} fill={`url(#radialGrad${randomId})`}/>

                {/*inner circle*/}
                <Circle {...commonProps} r={(diameter / 2)*0.75} fill={`url(#linearGrad${randomId})`} />

                {/*Arrow in circle*/}
                <Polygon
                    points={this.arrowDirection}
                    fill="white"
                />
            </Svg>
        )
    }
}