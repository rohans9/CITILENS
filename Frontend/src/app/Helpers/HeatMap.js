const HeatMap = (data) => {

    const arr = data.map((e) => [e.Latitude, e.Longitude, '25']);

    let heatmap = L.heatLayer(arr, { radius: 10 });

    return heatmap;
}

export default HeatMap;