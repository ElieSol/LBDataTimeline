import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import {createContainer, VictoryLabel, VictoryGroup, VictoryTooltip, VictoryVoronoiContainer, VictoryLegend, VictoryTheme, VictoryScatter, VictoryChart, VictoryLine, VictoryAxis, VictoryBrushContainer} from 'victory';
import { observable } from 'mobx';
import autobind from 'autobind-decorator';


const SVG_ID = "plots-tab-plot-svg";


export type TimelinePlotProps = {

}

export type TimelinePlotState = {
    zoomDomain: any;
}

let source:any;

export class TimelinePlot extends React.Component<TimelinePlotProps, TimelinePlotState>{
    @observable plotExists:boolean = false;
    containerRef: any;

    public constructor(props: TimelinePlotProps){
        super(props);
        
        this.state = {
            zoomDomain: { x: [1,5] },
        }

        this.logContainerRef = this.logContainerRef.bind(this);
    }

    /*
        COMPONENT STATE MANAGEMENT
    */

    componentDidMount() {      
        this.logContainerRef();
    }

    componentDidUpdate() {
        this.plotExists = !!this.getSvg();
    }

    // MT TO MANAGE THE ZOOM
    handleZoom(domain: any) {
        this.setState({ zoomDomain: domain });
    }

    /* 
      PART RELATED TO GRAPH EXPORT
    */
    private svgContainer!: HTMLDivElement;
    

    logContainerRef() {
        console.log(this.containerRef);
    };

   /* MT TO GET/EXPORT A DOM ELT INTO AN SVG ELT
     ___________________________________________
     Return: SVG ELT
   */
    @autobind
    private getSvg() {
        return this.containerRef.firstElementChild as SVGElement;
    }


   private checkDivChildComponents(divId:any){
     var element = document.getElementById(divId);
     if(element!== null){
       var count = element.childElementCount;
       if(count===1){
         return false;
       }
       if(count>1){
         return true;
       }
     }
     return false;
   } 

    render () {
        const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
        let maxValue = 365

        return (
            <div  id="timeline" ref = {(container) => {this.svgContainer = container!}}>
                <VictoryChart
                    name="FragmentLengthChart"
                    padding={{ top: 15, left: 40, right: 60, bottom: 25 }}
                    theme={VictoryTheme.material}
                    width={400}
                    height={200}
                >
                    
                </VictoryChart>


                {/*
              SCROLLBAR GRAPH
         
                <VictoryChart
                    padding={{ top: 0, left: 40, right: 60, bottom: 30 }}
                    width={400} 
                    height={50}
                    maxDomain={{x:maxValue,y:1}}
                    minDomain={{x:0,y:-0.05}}
                    containerComponent={
                    <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={this.state.zoomDomain}
                        onBrushDomainChange={this.handleZoom.bind(this)}
                    />
                    }
                >
                    <VictoryAxis
                        label="Timeline"
                        axisLabelComponent={<VictoryLabel className="labels" dy= {-5} />}
                        tickValues = {listTickValues}
                        tickFormat = {(t:any)=>`${Math.round((t/365)*100)/100}y`}
                        style={{
                            axis: {stroke: "grey"},
                            grid:{stroke: "grey"},
                            axisLabel:{
                                fontSize: 8, 
                                style: "italic"},
                                ticks: {stroke:"grey", size:3},
                                tickLabels:{fontSize:5, padding:5}
                            }}
                    />


                    <VictoryAxis
                        orientation="top"
                        tickFormat = {()=>``}
                        style={{
                            axis: {stroke: "grey"}
                        }}
                    />

                    <VictoryAxis
                        orientation="left"
                        tickFormat = {()=>``}
                        style={{
                            axis: {stroke: "grey"}
                        }}
                    />

                    <VictoryAxis
                        orientation="right"
                        tickFormat = {()=>``}
                        style={{
                            axis: {stroke: "grey"}
                        }}
                    />
                </VictoryChart>
                 */}
            </div>
        )
    }
}