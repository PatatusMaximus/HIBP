var HIBP = HIBP || {};

HIBP.HibpPassword= function(callBack) {
    this.url = "https://api.pwnedpasswords.com/range/";
    this.CheckCallback = callBack;
    this.RateExceededCallback = function(){};
    this.ComputeHash = HIBP.HashPassword;
    this.QueryAPICallback = function(hash,hashSplit,apiResult){

        let occurrences = this.CountOccurences(apiResult,hashSplit);
        this.CheckCallback(hash,occurrences);
    };
    this.SplitHash = function(passworHash){
        return {
            prefix : passworHash.substring(0,5).toUpperCase(),
            suffix : passworHash.substring(5).toUpperCase()
        };
    };
    this.QueryAPI = function(hash,password,thisArg){
        let hashSplit = thisArg.SplitHash(hash);
        let request = new XMLHttpRequest();
        
        request.onreadystatechange = function() { 
            if (request.readyState == 4)
            if(request.status == 200){
                thisArg.QueryAPICallback(hash,hashSplit,request.responseText.split("\r\n"));
            } else if(request.status == 429)
            {
                thisArg.RateExceededCallback(hash,password,hashSplit,thisArg);
            }
        };
        request.open("GET", thisArg.url+hashSplit.prefix, true); 
        request.send(null);
    };
    this.CountOccurences = function(apiResult,hashSplit){
        for(let i = 0; i < apiResult.length; i++){
            let apiSplit = apiResult[i].split(':');
            if(hashSplit.suffix === apiSplit[0]){
                return apiSplit[1];
            }
        }

        return 0;
    };
    this.GetPasswordOccurences = function(password){
        this.ComputeHash(password,this.QueryAPI,this);
    };
};

HIBP.HashPassword = function(password, callBack, thisArg){
    // We transform the string into an arraybuffer.
    var buffer = new TextEncoder("utf-8").encode(password);
    return crypto.subtle.digest("SHA-1", buffer).then(function (hash) {
        return HIBP.hex(hash);
    }).then(function(hex){
        callBack(hex,password,thisArg);
    });
};

  
HIBP.hex = function(buffer) {
    var hexCodes = [];
    var view = new DataView(buffer);
    for (var i = 0; i < view.byteLength; i += 4) {
        // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        var value = view.getUint32(i)
        // toString(16) will give the hex representation of the number without padding
        var stringValue = value.toString(16)
        // We use concatenation and slice for padding
        var padding = '00000000'
        var paddedValue = (padding + stringValue).slice(-padding.length)
        hexCodes.push(paddedValue);
    }

    // Join all the hex strings into one
    return hexCodes.join("");
};
