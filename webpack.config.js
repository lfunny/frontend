var webpack = require("webpack")
webpack.I18nPlugin = require("i18n-webpack-plugin")

var languages = {
	"en" : require("./lang/en_US.json"),
	"ru" : require("./lang/ru_RU.json"),
	"uk" : require("./lang/uk_UA.json")
}

module.exports = Object.keys(languages).map(function(key) {

	return {
		"context" : __dirname,
		"entry" : "./src/index.jsx",

		"module" : {
			"rules" : [
				{
					"test" : /\.jsx$/,
					"exclude" : /node_modules/,
					"loader" : "babel-loader",
					"options" : {
						"presets" : [ "env", "react" ]
					}
				}
			]
		},

		"output" : {
			"path" : __dirname + "/bin/" + key,
			"filename" : "script.min.js"
		},

		"plugins" : [
			new webpack.DefinePlugin({ "process.env.NODE_ENV" : JSON.stringify("production") }),
			new webpack.optimize.UglifyJsPlugin({ "mangle" : false, "sourcemap" : false, "output" : { "comments" : false } }),
			new webpack.I18nPlugin(languages[key], { "functionName" : "__" })
		]
	}

})
