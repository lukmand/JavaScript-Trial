// Change name function that takes in list of answer,
// list of index, and new name.

function changeName(answer, idx, name){

	//for each index recorded in idx, change the name in answer
	for each(var item in idx){
		var txt = answer[item].split(" ");
		answer[item] = name + " " + txt[1] + " " + txt[2];
	}
	return answer;
}

function solution(record){
	// Initialize dict, count, and position
	var count = 0;
	var answer = [];
	var locator = {};
	var pos = [];
	var newtext = [];
	
	// For each item in record, split by space
	for each(var item in record){
		var arr = item.split(" ");
		
		// If the first string is enter
		if (arr[0] == "Enter"){
		
			// Push into answer with name and came in
			answer.push(arr[2] + " came in");
			
			// Compare to dictionary if the id is in locator
			// If the id is in locator get the previous index and change the previous name in answer
			if (arr[1] in locator){
				pos = locator[arr[1]];
				newtext = changeName(answer, pos, arr[2]);
				answer = newtext;
				
				// Push the new index to locator for future reference
				locator[arr[1]].push(count);
				count++;
			}
			// If id not in locator, add a new keys and push the new index
			else{
				locator[arr[1]] = new Array();
				locator[arr[1]].push(count);
				count++;
			}
		}
		// If the first string is leave
		else if (arr[0] == "Leave"){
			
			// Push name and has left to answer
			answer.push(arr[2] + " has left");
			count++;
		}
		
		// If the first string is change, change the name with changeName function
		else if (arr[0] == "Change"){
			pos = locator[arr[1]];
			newtext = changeName(answer, pos, arr[2]);
			answer = newtext;
		}
		else{
			return new Error("Something is wrong");
		}
	}
	
	return answer;
}