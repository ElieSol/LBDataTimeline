import * as React from 'react';
import ReactDom from 'react-dom';
import Select from 'react-select';
import {createContainer, VictoryLabel, VictoryGroup, VictoryTooltip, VictoryVoronoiContainer, VictoryLegend, VictoryTheme, VictoryScatter, VictoryChart, VictoryLine, VictoryAxis, VictoryBrushContainer} from 'victory';

export type TimelinePlotProps = {

}

export type TimelinePlotState = {

}


export class TimelinePlot extends React.Component<TimelinePlotProps, TimelinePlotState>{

    public constructor(props: TimelinePlotProps){
        super(props);
    }

    render () {
        return (
            <div>
                <VictoryChart>

                </VictoryChart>
            </div>
        )
    }
}