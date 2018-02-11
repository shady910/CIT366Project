function Set() {
	
	// finds the intersection of two list
	this.intersection = function(listA, listB) {

        var resultList = []; // creates an resultList array

		if (listA === null || listB === null) {
			return null;
		}

		for (var a = 0; a < listA.length; a++){
			var nextValue = listA[a]; // get next value in list

			// elements for listB
			for
            (var b = 0; b < listB.length; b++){
                if (listB[b] === nextValue) {
                    resultList.push(listB[b]); // add an end value to array with push
                    break; // exit the listB inner loop
                }
			}
		}
       
	   return resultList; // close off intersection function\

	}

    
    
    
	this.union = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }
// use symmetricDifference to find union.
        var flag1 = this.symmetricDifference(listA,listB);
        // loop through listA
        for(var a =0; a < flag1.length; a++){
            // create third array, with new values
            resultList.push(flag1[a]);
        }
        //loop through listB
        var flag2 = this.intersection(listA,listB);
        for(var b = 0; b < flag2.length; b++){
            resultList.push(flag2[b]);
        }
	   
	   return resultList;
	}




	this.relativeComplement = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

        for (var a = 0; a < listA.length; a++){
            var nextValue = listA[a]; // get next value in list
	var flag = false;
            // elements for listB
            for (var b = 0; b < listB.length; b++){
                if (listB[b] === nextValue) {
                    flag = true;// add an end value to array with push
                    break; // exit the listB inner loop
                }
            }
            if(!flag){
                resultList.push(listA[a]); // add an end value to array with push
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
        for (var a = 0; a < flag1.length; a++) {
            resultList.push(flag1[a]);
        }

// loop through listB to create new value r2
        var flag2 = this.relativeComplement(listB, listA);

        for (var b = 0; b < flag2.length; b++) {
            resultList.push(flag2[b]);
        }

       
	   return resultList;
	}	
	

}
