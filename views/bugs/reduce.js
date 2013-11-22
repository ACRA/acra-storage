function (key, values, rereduce) {
    var result = {
        exception: null,
        rootCause: null,
        appVersion: null,
        description: "",
        latest: 0,
        count: 0,
        solved: false
    };
    
    // Reduce the descriptive fields in value
    // Assumes that all items with same key have the same values
    // for these fields
    for (i=0; i < values.length; ++i) {
        if ( values[i].exception !== null ){
            result.exception = values[i].exception;
            result.rootCause = values[i].rootCause;
            result.appVersion = values[i].appVersion;
            break;
        }
    }

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