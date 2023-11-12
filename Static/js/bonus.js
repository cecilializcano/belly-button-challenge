function gaugeDisplay(wFreq){
    console.log(wFreq)
    var gaugeData =[{
        type:"indicator",
        value: wFreq, 
        mode: "gauge+number",
        gauge: {
            axis: { range: [0, 10], dtick: 2 },
            bar: { color: "#c05b42" },
            steps: [
                { range: [0, 2], color: "#B4DCB0" },
                { range: [2, 4], color: "#8DCA89" },
                { range: [4, 6], color: "#64B863" },
                { range: [6, 8], color: "#45A749" },
                { range: [8, 10], color: "#37983B" }
            ]
        }
    }];

    var gaugeLayout = {
        title: {
            text: "<b>Belly Buttom Washing Frequency</b><br>Scrubs per week",
            y: 0.75
        },
        margin: {
            l:50,
            r:50,
            b:0,
            t:50,
            pad: 50
        }
    };
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
}