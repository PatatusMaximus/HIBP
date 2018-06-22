var HIBP = HIBP || {};

HIBP.HibpPassword= function() {
    this.url = "https://api.pwnedpasswords.com/range/";
    this.GetHash = HashPassword;
    this.QueryAPI = function(passwordHashPrefix){
        let request = new XMLHttpRequest();
        //TODO call HaveIBeenPwned API
    };
    this.SplitHash = function(passworHash){
        return {
            prefix : passworHash.substring(0,5),
            suffix : passworHash.substring(5)
        };
    };
    this.GetPasswordOccurence = function(password){
        let passwordHash = GetHash(password);
        let hashSplit = SplitHash(passwordHash);
        let apiResult = QueryAPI(hashSplit.prefix);

        for(let i = 0; i < apiResult.length; i++){
            let apiSplit = apiResult[i].split(':');
            if(hashSplit.suffix === apiSplit[0])
            {
                return apiSplit[1];
            }
        }

        return 0;
    };
};

HIBP.HashPassword = function(password){
    // We transform the string into an arraybuffer.
    var buffer = new TextEncoder("utf-8").encode(str);
    return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
        return hex(hash);
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