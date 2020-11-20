export const distanceFindHandler = (value1, vlaue2, countires) => {
    let conuntry1 = value1;
    let conuntry2 = vlaue2;
    let lat1 = null;
    let long1 = null;
    let lat2 = null;
    let long2 = null;
    let distnase = null;
    countires.forEach(country => {
        if (country.alpha3Code === conuntry1) {
            lat1 = country.latlng[0];
            long1 = country.latlng[1];
        }
        if (country.alpha3Code === conuntry2) {
            lat2 = country.latlng[0];
            long2 = country.latlng[1];
        }
    })
    // console.log(lat1,lat2, long1, long2);
    if (lat1 && lat2 && long1 && long2) {
        const distnase = distance(lat1, long1, lat2, long2, "K");
        return distnase;
    }
    return distnase;
}

const distance = (lat1, lon1, lat2, lon2, unit) => {
    let dist = null;
    if ((lat1 === lat2) && (lon1 === lon2)) {
        dist = 0;
    }
    else {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") { dist = dist * 1.609344 }
    }
    return dist;
}