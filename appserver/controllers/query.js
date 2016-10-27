var curl = require('curlrequest');

var curlLoginOptions = {
	url:'http://localhost:3000/javascripts/coordinates.json'
}

module.exports.getCoordinates = function(req, res, next){
	curl.request(curlLoginOptions, function (err, output) {
		if(err){
			res.end("Couldn't load coordinates");
		}else{
			res.coordinates = output;
			next();
		}
	});
}

function getDistance(refPoint, comparePoint){
	if(refPoint){
		var refCoordinates = (refPoint.value + "").split(",");
		var compCoordinates = (comparePoint.value + "").split(",");
		return Math.sqrt(Math.pow((refCoordinates[0]-compCoordinates[0]), 2) + Math.pow((refCoordinates[1]-compCoordinates[1]), 2));
	}else{
		return 0;
	}
}

function sortCoordinates(refPoint, coordinatesJSONArr){
	return coordinatesJSONArr.sort(function(a, b){
		return getDistance(refPoint, a) - getDistance(refPoint, b);
	});
}

module.exports.getSortedCoordinates = function(req, res){
	if(res.coordinates){
		var coordinates = JSON.parse(res.coordinates);
		// res.sortedCoordinates = sortCoordinates({"id":"refPoint","value":(req.query.x + "," + req.query.y)}, coordinates);
		console.log(req.query.x);
		if((req.query.x || req.query.x == 0) && (req.query.y || req.query.y == 0) && !isNaN(req.query.x) && !isNaN(req.query.y) && req.query.x.length && req.query.y.length){
			res.json(sortCoordinates({"id":"refPoint","value":(req.query.x + "," + req.query.y)}, coordinates));
		}else{
			res.json(coordinates);
		}
	}else{
		res.end("Couldn't find coordinates");
	}
}