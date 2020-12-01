/*
Script name: troubleshootVroVersion

Inputs:
- fqdn (string)

Return Type:
- vRO 7.X: (string)
- vRO 8.X: (string)

Description field:
Author: M. Buijs - Be-Virtual.net
Developed by: M. Buijs - Be-Virtual.net
Date: 2020-11-26
Version: 1.0.0

Description: This action outputs the vRealize Orchestrator version running in detail. Can be run against other vRealize Orchestrator nodes in the network.
*/

///////////////////////////////////////// Start Code /////////////////////////////////////////

// Input validation
if (!fqdn) {
	throw "The input variable 'fqdn' is null, this is not allowed!";
}

// Determine vRO Port
try {
    // Port 8181
    url = "https://" + fqdn + ":8181/vco/api/about";

    // Create URL object
    var urlObject = new URL(url);

    // Retrieve content
    var result = urlObject.getContent() ;

    // Message
    System.log ("Found a vRealize Orchestrator node on port 8181");
}
catch (error) {
    System.log ("No vRealize Orchestrator node found on port 8181 (" + error.message + ")");
}
try {
    // Port 443
    url = "https://" + fqdn + ":443/vco/api/about";

    // Create URL object
    var urlObject = new URL(url);

    // Retrieve content
    var result = urlObject.getContent() ;

    // Message
    System.log ("Found a vRealize Orchestrator node on port 443");
}
catch(error) {
    throw "Could not find any vRealize Orchestrator node on port 443 & 8181 (" + error.message + ")";
}

// JSON Parse
try {
    // Parse JSON data
    var jsonObject = JSON.parse(result);
}
catch (error) {
    throw "There is an issue with the JSON object (" + error.message + ")";
}

// Output data to screen
try {
    System.log("===== " + fqdn + " =====");
    System.log("Version: "+ jsonObject.version);
    System.log("Build number: "+ jsonObject["build-number"]);
    System.log("Build date: "+ jsonObject["build-date"]);
    System.log("API Version: "+ jsonObject["api-version"]);
}
catch (error) {
    throw "There is something wrong with the output, please verify the JSON input (" + error.message + ")";
}