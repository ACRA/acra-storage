function (key, values, rereduce) {
    var result = { latest: 0, count: 0, solved: false, description: ""};
    for(i=0; i<values.length;++i) {
        var value = values[i];
        // compute stats
        if(value.latest && value.count){
            if(result.latest < value.latest) {
                result.latest = value.latest;
            }
            result.count += value.count;
        }
        // 'solved' marker
        if(value.solved) {
            result.solved = true;
        }
        if(value.description) {
            result.description = value.description;
        }
    }
    return result;
}