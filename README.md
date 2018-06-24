# HIBP
This is a javascript integration for **Troy Hunt's HaveIBeenPwned** password search by range API .
Details for the API can be found here : https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange

The API allows to check if a password has been already leaked (wich mean you sould never use it!).

## How to use
Simply download **HibpPassword.js** and add it to your application.
You can then instanciate an `HIBP.HibpPassword` object with a callback wich will be called after a successfull API call and use `GetPasswordOccurences()` on your object with the a password to test.
For example :
```
<script type="text/javascript" src="JS/HibpPassword.js" ></script>
<script>

    //intialize a password checker.
    //for each check we just display how many times the password has been found
    let passwordChecker = new HIBP.HibpPassword((hash,count)=>{
        Alert(`Your password has been found <b>${count}</b> times in HIBP database.`);
    });

    //check how many times "password" appears in HIBP database
    passwordChecker.GetPasswordOccurences("password");
</script>
```
You can check the file **demo.html** for a full demonstration. 

## License
You must comply with HaveIBeenPwned license https://haveibeenpwned.com/API/v2#License.

By default HibpPassword.js uses [webtoolkit's SHA1 implementation](http://webtoolkit.info/javascript_sha1.html) so you need to comply with their license or use your own SHA1 function.

For everythin else you are free to use this code the way you want without any restriction as long as you don't take ownership and keep it free.

