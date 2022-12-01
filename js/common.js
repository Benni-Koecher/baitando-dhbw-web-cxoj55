/**
 * Load stored captures from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored captures from local storage or empty captures array, if no captures were present.
 */
 function loadStoredCaptures() {
  var storedCapturesJson = localStorage.getItem("captures");
  if (storedCapturesJson) {
      var captures = JSON.parse(storedCapturesJson);
      console.debug(`Count of loaded captures: ${captures.length}`);
      var storedCaptures = bblSort(captures)
      return storedCaptures;
  }
  

  return [];
}

/**
* Store captures in the local storage.
*
* @param captures Captures to store.
*/
function storeCaptures(captures) {
  if (captures) {
      localStorage.setItem("captures", JSON.stringify(captures));
      console.debug(`Count of stored captures: ${captures.length}`);
  } else {
      console.error("No captures to store");
  }
}



// Bubble sort Implementation using Javascript
 
 
// Creating the bblSort function
function bblSort(captures){
    
  for(var i = 0; i < captures.length; i++){
     
    // Last i elements are already in place 
    for(var j = 0; j < ( captures.length - i -1 ); j++){
       
      // Checking if the item at present iteration
      // is greater than the next iteration
      if(captures[j].date > captures[j+1].date){ //< tauschen! 
         
        // If the condition is true then swap them
        var temp = captures[j]
        captures[j] = captures[j + 1]
        captures[j+1] = temp
      }
    }
  }
  // Print the sorted capturesay
  return captures.reverse();
 }
  