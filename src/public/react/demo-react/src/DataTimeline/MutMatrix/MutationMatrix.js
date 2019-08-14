var jStat = require('jStat').jStat; 
var jz = require("jeezy");
var data2grid = require("data2grid");
var chroma = require("chroma-js");

//import {Clustergrammer} from './clustergrammer';
import * as Plotly from 'plotly.js';
import {newPlot} from 'plotly.js';
import * as d3 from 'd3v4';
import { interpolateGnBu } from 'd3-scale-chromatic';

import * as bootstrap from 'bootstrap';

export const MutationMatrix = function (dataDict) {
    
  var dict = dataDict;
    //var dict = {'MUC17_100678086_ch7':dataDict['MUC17_100678086_ch7'],'ABL1_133759489_ch9':dataDict['ABL1_133759489_ch9'],'TGFBR2_30691871_ch3':dataDict['TGFBR2_30691871_ch3'],'KMT2C_151874147_ch7':dataDict['KMT2C_151874147_ch7']};
    //var dict = {"IDH1":[20,45,62,0], "KRAS":[56,93,10,0], "MTC2": [4,75,34,0], "BRCA2":[1,88,59,0]};
    var listOfKeys = Object.keys(dict);
    var length_dict = listOfKeys.length;

  // TEST 2
  
  var max = 0;
  for(let key in listOfKeys){
    let id = listOfKeys[key];
    let current_list_length = dict[id].length;
    if(current_list_length>max){
      max = current_list_length;
    }
  }

  let k=0;

  for(let key in listOfKeys){
    let id = listOfKeys[key];
    let current_list_length = dict[id].length;
    if(current_list_length<max){
      if(current_list_length<=1){
        delete dict.id;
        console.log("LGTH CT LIST = "+current_list_length+"_ID = "+id)
        listOfKeys.splice(k, 1)
        k-=1;
      }
      else{
        for(var i=0; i<(max - current_list_length);i++){
          dict[id].push(0);
        }
      }
    }
    k+=1;
  }
  

  //console.log("Matrix Test");

  d3.select(".modal-body").append("div").attr("class", "tip").style("display", "none");

  var data = [];
  var data_toexport = [];
  var cols = [listOfKeys[0],listOfKeys[1],listOfKeys[2],listOfKeys[3],listOfKeys[4],listOfKeys[5],listOfKeys[6],listOfKeys[7],listOfKeys[8],listOfKeys[9],listOfKeys[10],listOfKeys[11],listOfKeys[12],listOfKeys[13],listOfKeys[14],listOfKeys[15],listOfKeys[16],listOfKeys[17],listOfKeys[18],listOfKeys[19]];

  var j=0;
   for (var i = 0; i <= 20; i++){
     var obj = {index: i};
     
     cols.forEach(col => {
       obj[col] = (dict[col][j]);
       
     });
     j+=1;
     data.push(obj);
   }
   
   //console.log("DATA = "+data);
   for(let i in data){
      //console.log("I = "+i+" _CT OF DATA = "+data[i]);
        let list = data[i];
        for(let li in list){
          if(list[li]==undefined){
            list[li]=0;
          }
          //console.log("LI = "+li+"_CT LIST = "+list[li]);
      }
   }
   
   var corr = jz.arr.correlationMatrix(data, cols);
   
   //console.log("CORR RES = "+corr[0]);
   for(let elt in corr){
     let list = corr[elt];
     //console.log("CTT OF DT = "+list);
     if(list.column_x!==list.column_y && list.correlation===1){
        let list = [];
        list.push(list.column_x,list.column_y,list.correlation);
        data_toexport.push(list);
     }
   }
   
   
   var extent = d3.extent(corr.map(function(d){ return d.correlation; }).filter(function(d){ return d !== 1; }));
 
   var grid = data2grid.grid(corr);
   var rows = d3.max(grid, function(d){ return d.row; });
 
   var margin = {top: 20, bottom: 1, left: 20, right: 20};
 
   var dim = d3.min([window.innerWidth * .5, window.innerHeight * .5]);
 
   var width = dim - margin.left - margin.right-5, height = dim - margin.top - margin.bottom-5;
 
   var svg = d3.select("#MutMatrix").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
 
   var padding = 0.1;
 
   var x = d3.scaleBand().rangeRound([0, width]).paddingInner(padding).domain(d3.range(1, rows + 1));
 
   var y = d3.scaleBand().rangeRound([0, height]).paddingInner(padding).domain(d3.range(1, rows + 1));
 
   var c = chroma.scale(["tomato", "white", "steelblue"])
     .domain([extent[0], 0, extent[1]]);
 /*
   var x_axis = d3.axisTop(y).tickFormat(function(d, i){ return cols[i]; });
   var y_axis = d3.axisLeft(x).tickFormat(function(d, i){ return cols[i]; });
 */
   var x_axis = d3.axisTop(y).tickFormat(function(d, i){ return null; });
   var y_axis = d3.axisLeft(x).tickFormat(function(d, i){ return null; });
 

   svg.append("g")
       .attr("class", "x axis")
       .call(x_axis)
       .selectAll("text")
        .style("text-anchor","end")
        .attr("transform","rotate(65)")
 
   svg.append("g")
       .attr("class", "y axis")
       .call(y_axis);
 
   svg.selectAll("rect")
       .data(grid, function(d){ return d.column_a + d.column_b; })
       .enter().append("rect")
       .attr("x", function(d){ return x(d.column); })
       .attr("y", function(d){ return y(d.row); })
       .attr("width", x.bandwidth())
       .attr("height", y.bandwidth())
       .style("fill", function(d){ return c(d.correlation); })
       .style("opacity", 1e-6)
       .transition()
       .style("opacity", 1);
 
   svg.selectAll("rect")
 
   d3.selectAll("rect")
     .on("mouseover", function(d){
 
       d3.select(this).classed("selected", true);
 
       d3.select(".tip")
           .style("display", "block")
           .html("X value = " + d.column_x + ", " + "Y value = " + d.column_y + ", CORR = " + d.correlation.toFixed(2));
 
       var row_pos = y(d.row);
       var col_pos = x(d.column);
       var tip_pos = d3.select(".tip").node().getBoundingClientRect();
       var tip_width = tip_pos.width;
       var tip_height = tip_pos.height;
       var grid_pos = d3.select("#grid").node().getBoundingClientRect();
       var grid_left = grid_pos.left;
       var grid_top = grid_pos.top;
 
       var left = grid_left + col_pos + margin.left + (x.bandwidth() / 2) - (tip_width / 2);
       var top = grid_top + row_pos + margin.top - tip_height - 5;
 
       d3.select(".tip")
           .style("left", left + "px")
           .style("top", top + "px");
 
       d3.select(".x.axis .tick:nth-of-type(" + d.column + ") text").classed("selected", true);
       d3.select(".y.axis .tick:nth-of-type(" + d.row + ") text").classed("selected", true);
       d3.select(".x.axis .tick:nth-of-type(" + d.column + ") line").classed("selected", true);
       d3.select(".y.axis .tick:nth-of-type(" + d.row + ") line").classed("selected", true);
 
     })
     .on("mouseout", function(){
       d3.selectAll("rect").classed("selected", false);
       d3.select(".tip").style("display", "none");
       d3.selectAll(".axis .tick text").classed("selected", false);
       d3.selectAll(".axis .tick line").classed("selected", false);
     });
 
   // legend scale
   var legend_top = 15;
   var legend_height = 15;
 
   var legend_svg = d3.select("#legend").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", legend_height + legend_top)
     .append("g")
       .attr("transform", "translate(" + margin.left + ", " + legend_top + ")");
 
   var defs = legend_svg.append("defs");
 
   var gradient = defs.append("linearGradient")
       .attr("id", "linear-gradient");
 
   var stops = [{offset: 0, color: "tomato", value: extent[0]}, {offset: .5, color: "white", value: 0}, {offset: 1, color: "steelblue", value: extent[1]}];
   
   gradient.selectAll("stop")
       .data(stops)
       .enter().append("stop")
       .attr("offset", function(d){ return (100 * d.offset) + "%"; })
       .attr("stop-color", function(d){ return d.color; });
 
   legend_svg.append("rect")
       .attr("width", width)
       .attr("height", legend_height)
       .style("fill", "url(#linear-gradient)");
 
   legend_svg.selectAll("text")
       .data(stops)
       .enter().append("text")
       .attr("x", function(d){ return width * d.offset; })
       .attr("dy", -3)
       .style("text-anchor", function(d, i){ return i == 0 ? "start" : i == 1 ? "middle" : "end"; })
       .text(function(d, i){ return d.value.toFixed(2) + (i == 2 ? ">" : ""); })
     
}


export const getCorrelatedMutations = function (dataDict) {
  var dict = dataDict;
  var listOfKeys = Object.keys(dict);
  var length_dict = listOfKeys.length;
  
  var max = 0;
  for(let key in listOfKeys){
    let id = listOfKeys[key];
    let current_list_length = dict[id].length;
    if(current_list_length>max){
      max = current_list_length;
    }
  }

  let k = 0;

  for(let key in listOfKeys){
    let id = listOfKeys[key];
    let current_list_length = dict[id].length;
    if(current_list_length<max){
      if(current_list_length<=1){
        delete dict.id;
        console.log("LGTH CT LIST = "+current_list_length+"_ID = "+id)
        listOfKeys.splice(k, 1)
        k-=1;
      }
      else{
        for(var i=0; i<(max - current_list_length);i++){
          dict[id].push(0);
        }
      }
    }
    k+=1;
  }

  var data = [];
  var data_toexport = [];
  let cols = [];

  for(var j=0; j<= length_dict; j++){
    if(listOfKeys[j]!==undefined){
      cols.push(listOfKeys[j]);
    }
  }

  console.log("LENGTH OF COLS = "+cols.length);
  console.log("FIRST ELT = "+cols[0]);

  for(var i = 0; i <= cols.length-2; i++){
    console.log("VAL = "+cols[i]);
  }

  var j=0;
   for (var i = 0; i <= 20; i++){
     var obj = {index: i};
     cols.forEach(col => {
       obj[col] = (dict[col][j]);      
     });
     j+=1;
     data.push(obj);
   }

  for(let i in data){
        let list = data[i];
        for(let li in list){
          if(list[li]==undefined){
            list[li]=0;
          }
     }
   }
   
   var corr = jz.arr.correlationMatrix(data, cols);
   
   let cpt = 0;

  for(let elt in corr){
     let list = corr[elt];
     if(list.column_x!==list.column_y && list.correlation===1){
      console.log("X = "+list.column_x+"_Y = "+list.column_y);
      if(data_toexport.includes([list.column_y,list.column_x,list.correlation])===false&&data_toexport.includes([list.column_x,list.column_y,list.correlation])===false){
        console.log("RES TEST = "+data_toexport.includes([list.column_y,list.column_x,list.correlation]));
        console.log("FALSE");
        let sublist = [];
        sublist.push(list.column_x);
        sublist.push(list.column_y);
        sublist.push(list.correlation);
        data_toexport.push(sublist);
        cpt+=1;
      }
    }
  }
  console.log("CPT = "+cpt);

  return data_toexport;
}

