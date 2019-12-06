//Check if a column is a primary key
function primaryKey(column){
	var record = [];
	for each(var item in column){
		if (record.includes(item) == true)
			return 0;
		else
			record.push(item);
	}
	return 1;
}

//Compare between Two column if they are unique
function compare(left, right){
	var temp1 = new Array();
	var temp2 = new Array();
	for (var i = 0; i < left.length; i++){
		if (temp1.length == 0 and temp2.length == 0){
			temp1.push(left[i]);
			temp2.push(right[i]);
		}
		else{
			if(temp1.includes(left[i]) == true){
				if (temp2.includes(right[i]) == true)
					return 0;
				else{
					temp1.push(left[i]);
					temp2.push(right[i]);	
				}
			}
			else{
				temp1.push(left[i]);
				temp2.push(right[i]);	
			}
		}
	}
	return 1;
}

//Helper function for if statement
function helperFunc(as, bs, cs, ds, a, b, c, d){
	var count = 0;
	
	//If a is a primary key, candidate +1
	if (as == 1)
		count++;
		if (bs == 1){
			
			//If b is a primary key, candidate +1
			count++;
			if (cs == 1){
				
				//If c is a primary key, candidate +1
				count++;
			}
			if(ds == 1){
				
				//If d is a primary key, candidate +1
				count++;
			}
			
			// If c and d is not primary key, compare c and d if they are unique
			else
				count += compare(c, d);
		}
		//If b is not primary key, check C
		else if (cs == 1){
			count++;
			
			if(ds == 1){
				
				//If d is a primary key, candidate +1
				count++;
			}
			else
				count += compare(b, d);
		}
		
		//Check if d is a primary key, if not compare b, c, d
		else if (ds == 1){
			count++;
			count += compare(b, c);
		}
		else{
			count += compare(c, d);
			count += compare(b, d);
			count += compare(b, c);
		}
		
	//A is not primary key, start with B
	else if (bs == 1)
		count++;
	
		//If c is a primary key, candidate +1
		if (cs == 1){
			count++;
			
			if(ds == 1){
				
				//If d is a primary key, candidate +1
				count++;
			}
			count += compare(a, d);
		}
		//If d is a primary key, candidate +1
		else if (ds == 1){
			count++;
			count += compare(a, c);
		}
		else{
			count += compare(a, d);
			count += compare(a, c);
			count += compare(c, d);
		}
	
	//A, B is not primary key, start with C
	else if (cs == 1)
		count++;
		if (ds == 1){
			count++;
			count += compare(a, b);
		}
		else{
			count += compare(a, b);
			count += compare(a, d);
			count += compare(b, d);
		}
		
	//A, B, C is not primary key, start with D
	else if (ds == 1){
		count++;
		count += compare(a, b);
		count += compare(a, c);
		count += compare(b, c);
	}
	else
		count++;
	return count;
}

//
function candidateKey(a, b, c, d){
	
	//Determine whether each column is a primary key
	var aState = primaryKey(a);
	var bState = primaryKey(b);
	var cState = primaryKey(c);
	var dState = primaryKey(d);
	var count = helperFunc(aState, bState, cState, dState, a, b, c, d);
	return count;
}

function solution(relation){
	
	//Divide database into id, name, major, and grade
	var id = [];
	var name = [];
	var major = [];
	var grade = [];
	for each(var db in relation){
		id.push(db[0]);
		name.push(db[1]);
		major.push(db[2]);
		grade.push(db[3]);
	}
	var count = candidateKey(id, name, major, grade);
	return count;
	
}