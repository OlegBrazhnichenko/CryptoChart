import React, {Component} from "react";
import {Svg} from "react-native-svg";
import SvgTradeIcon from "../../../SvgTradeIcon";

export default class Arrow extends Component {

    render() {
        const {x, y, datum} = this.props;

        // xAxisOffset should be a half of SvgTradeIcon diameter, by default 26
        const xAxisOffset = 13;
        // yAxisOffset 0.5 of diameter of SvgTradeIcon inner circle + 0.5 of diameter of outer circle
        // so yAxisOffset is Math.round(diameter * 0.875)
        const yAxisOffset = 23;

        return (
            <Svg {...this.props.events} x={x-xAxisOffset} y={y-yAxisOffset} >
                <SvgTradeIcon direction={datum.tradeDirection} connotation={datum.connotation}/>
            </Svg>
        );
    }
}