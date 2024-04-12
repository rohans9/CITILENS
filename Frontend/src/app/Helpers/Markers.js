export default function Markers(records) {
    var myIcon = L.icon({
        iconUrl: '/marker-icon.png',
        iconSize: [20, 30],
    });
    let cord = []
    for (let index = 0; index < records.length; index++) {
        cord.push(L.marker([records[index].Latitude, records[index].Longitude], { icon: myIcon }))
    }
    return cord;
}