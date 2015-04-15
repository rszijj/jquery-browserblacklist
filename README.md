# jquery-browserblacklist

Do you need to enable/disable a functionality for a particular browser or a particular browser version? **jQuery-BrowserBlacklist** is for you!
With only a single JSON array, you will be able to use two callbacks to customize your script.

## Installation

Include script after the jQuery library:

```html
<!-- Add jQuery library -->
<script src="/path/to/jquery.min.js"></script>

<!-- Add jQuery BrowserBlacklist -->
<script src="/path/to/jquery-browserblacklist.min.js"></script>
```

## Usage

### The JSON file

Create a JSON file anywhere you want. Here is the template of the file with some examples.

```json
blacklist({
	"all": [
		{
			"browser": 	"chrome",
			"version": 	">= 41"
		},
		{
			"browser": 	"chrome",
			"version": 	"<= 10"
		},
		{
			"browser": 	"firefox",
			"version": 	"<= 3"
		},
		{
			"browser": 	"ie",
			"version": 	"<= 5"
		},
		{
			"browser": 	"opera",
			"version": 	">= 0"
		}
	],

	"windows": [
		{
			"browser": 	"safari",
			"version":	">= 0"
		}
		
	],

	"mac": [],

	"linux": []
})
```

With this configuration, you will *blacklist* :
- Chrome under version 10 and upper version 41
- Firefox under version 3
- Internet Explorer under version 5
- Opera
- Safari on Windows

To see what options are available, please read the documentation below.

### The Javascript part

To initialize the plugin, use the constructor as defined. If you are not familiar with jQuery, please, read [this tutorial for beginners](http://docs.jquery.com/Tutorials:How_jQuery_Works).

```javascript
$(document).ready(function() {
    $.BrowserBlacklist({
        json: "json/popunder_compatibility.json", // URL to your JSON file

        // if the browser is not blacklisted
        isNotBlacklisted: function() {
            console.log("Browser with this specific version is not blacklisted");
        },
        // if the browser is blacklisted
        isBlacklisted: function() {
            console.log("Browser with this specific version is blacklisted");
        }
    });
});
```

## Documentation

### The JSON file

#### The operating system

The first key of the array handles the operating system. Possible choices are : `all`, `windows`, `mac` or `linux`.

#### The browser

Choices possible for the browser are : `chrome`, `firefox`, `opera` or `safari`.

#### The version

In this field, you can use an operator : `<=` or `>=` following with an integer. For example: `>= 5` or `<= 9` (space character between the operator and the integer have to be here).

### The Javascript part

#### json

Define the path to the JSON file. This option is **required**.

```javascript
json: "json/popunder_compatibility.json"
```

#### isNotBlacklisted()

Callback function called when the client browser is not blacklisted.

```javascript
isNotBlacklisted: function() {
    console.log("Browser with this specific version is not blacklisted");
}
```

#### isBlacklisted()

Callback function called when the client browser is blacklisted

```javascript
isBlacklisted: function() {
    console.log("Browser with this specific version is blacklisted");
}
```

## Note
- It is my first public plugin, so please correct me if something is not compliant!
- I'm a french developer, sorry for the eventual syntax mistakes :-)
