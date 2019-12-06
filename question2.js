function countRate(N, users){
	var fail = 0;
	var rate = 0;
	
	//Calculate failrate
	for (var i = 0; i < users.length; i++){
		if (users[i] == N)
			fail++;
		if (users[i] => N)
			rate++;
	}
	var failrate = fail*1.0/rate;
	return failrate;
}

function sortProperties(obj){

	// Convert object into array
	var sortitem = [];
	for (var key in obj)
		if (obj.hasOwnProperty(key))
			sortitem.push([key, obj[key]]);
			
	// Sort item by value
	sortitem.sort(function(a, b){
		if (a == b)
			return a[1]-b[1]	//If rate is same return lowest stage
		else
			return b[1]-a[1]	// Else return higher rate
		
	});
	return sortitem
}

function solution (N, users){
	rate = {};
	
	// Calculate the rate for each stage and store in dictionary
	while (N != 0){
		failure = countRate(N, users);
		rate[N] = failure;
		N--;
	}
	
	//Sorting algorithm based on value
	answer = sortProperties(rate);
	return answer
}