function Set() {
	
	// finds the intersection of two list
	this.intersection = function(listA, listB) {

        var resultList = []; // creates an resultList array

		if (listA === null || listB === null) {
			return null;
		}

		for (var i = 0; i < listA.length; i++){
			var nextValue = listA[i]; // get next value in list

			// elements for listB
			for (var j = 0; j < listB.length; j++){
                if (listB[j] === nextValue) {
                    resultList.push(listB[j]); // add an end value to array with push
                    break; // exit the listB inner loop
                }
			}
		}
       
	   return resultList; // close off intersection function
	}
    
    
    
	this.union = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }
// use symmetricDifference to find union.
        var flag1 = this.symmetricDifference(listA,listB);
        // loop through listA
        for(var i =0; i < flag1.length; i++){
            // create third array, with new values
            resultList.push(flag1[i]);
        }
        //loop through listB
        var flag2 = this.intersection(listA,listB);
        for(var j = 0; j < flag2.length; j++){
            resultList.push(flag2[j]);
        }
	   
	   return resultList;
	}




	this.relativeComplement = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

        for (var i = 0; i < listA.length; i++){
            var nextValue = listA[i]; // get next value in list
	var flag = false;
            // elements for listB
            for (var j = 0; j < listB.length; j++){
                if (listB[j] === nextValue) {
                    flag = true;// add an end value to array with push
                    break; // exit the listB inner loop
                }
            }
            if(!flag){
                resultList.push(listA[i]); // add an end value to array with push
			}
        }

       
	   return resultList;
	}



	this.symmetricDifference = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

// pull the relative complement to find the symmetricDifference.
        var flag1 = this.relativeComplement(listA, listB);
//loop through listA to create new value r1
        for (var i = 0; i < flag1.length; i++) {
            resultList.push(flag1[i]);
        }

// loop through listB to create new value r2
        var flag2 = this.relativeComplement(listB, listA);

        for (var j = 0; j < flag2.length; j++) {
            resultList.push(flag2[j]);
        }

       
	   return resultList;
	}	
	

}
