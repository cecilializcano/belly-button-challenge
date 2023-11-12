const path = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


function init(){
    // gathering elements for selDataset dropdown
    var selected = d3.select("#selDataset");
    d3.json(path).then((data)=> {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selected
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        // building the initial charts
        var firstSample = sampleNames[0];
        metadataDisplay(firstSample);
        plotCharts(firstSample);

    });
}
// running the initial dashboard
init();
 
function optionChanged(newSample){
    // go for new data at every new sample selected 
    metadataDisplay(newSample);
    plotCharts(newSample);
}

// panel display function 
function metadataDisplay(sample){
    d3.json(path).then((data) =>{
        var metadata = data.metadata;
        // go filtering for sample metadata 
        var results = metadata.filter(sampleObj => sampleObj.id == sample)
        var result = results[0];
        // select display panel sample-metadata using d3
        var metadataPanel = d3.select("#sample-metadata");
        // cleaning any existing metadata
        metadataPanel.html("");
        // tags for each key-value in the metadata 
        Object.entries(result).forEach(([key, value]) =>{
            metadataPanel.append("h6").text(`${key}: ${value}`);
        });
    });
}

// ploting charts function
function plotCharts(sample){
    // loadind json data
    d3.json(path).then((data) => {
        // gathering data from json object 
        var samples = data.samples;
        var metadata = data.metadata;
        // filtering data by selected sample 
        var sampleSample = samples.filter(sampleObj => sampleObj.id == sample);
        var metadataSample = metadata.filter(sampleObj => sampleObj.id == sample);
        // accesing to filtered element
        var firstSample = sampleSample[0];
        var firstMetadata = metadataSample[0];
        // silce and gathering the plotting data
        var otuIDs = firstSample.otu_ids.slice(0,10);
        var otuLabels = firstSample.otu_labels.slice(0,10);
        var sampleValues = firstSample.sample_values.slice(0,10); 
        var washFreq = firstMetadata.wfreq; 
        
        // adding OTU to otuIDs
        function addOTU(number){
            return "OTU " + number
        }
        
        let yTicks = otuIDs.map(addOTU)

        let barData = [{
            type: 'bar',
            x: sampleValues,
            y: yTicks,
            orientation: 'h',
            hovertext: otuLabels
        }];
        let barLayout = {
            height: 800,
            width: 590,
            yaxis: { autorange: 'reversed' }
        };
        
        Plotly.newPlot('bar', barData, barLayout);

        var bubbleData = [{
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIDs,
                colorscale: "Jet"
            }
        }];
        var bubbleLayout = {
            title: "<b>Bacteria Cultives Per Sample<>",
                xaxis: {title: "OTU Id"},
                automargin: true,
                hovermode: "closest"
        };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
        gaugeDisplay(washFreq);

    });
   
}