/**
 * Initialize the page. Will load all captures from the local storage and show them.
 */
 function initialize() {
  console.debug("Initializing list page")
  showCaptures(loadStoredCaptures());
}

/**
* Display the given captures in the captures list.
*
* @param captures The captures to show in the capture list.
*/
function showCaptures(captures) {
  if (captures) {  
    var count = 0; 
    var captureHtmlContentRed =`
    
    <div></div>
    <div class="headline-counter-total">
      <img src="img/counter_light.png"/>
      <p>&nbsp;${parseFloat(captures[0].counter).toFixed(2).replace(`.`,`,`)}&nbsp;kWh</p> 
    </div>
    
    <div class="energy-consumption-total">
      ${getImageLight(captures, count)}
      <div class="p-energy-consumption">
        <p>
        &nbsp;${calcDiffTotal(captures, count)}&nbsp;
      </p>
      <h2>&nbsp;${getDateTotal(captures, count)}</h2>
    </div>
  </div>
  `;
        var captureLi = document.createElement("ol");
          captureLi.innerHTML = captureHtmlContentRed;
          appendById("captures", captureLi);
  
      for (var capture of captures) {
        
        console.log(count);
          var captureHtmlContent = `
          
          <div class="headline-date">
              <img src="img/calendar.png"/>
              <p>${formatDate(new Date(capture.date))}</p>
          </div>

          <div class="headline-counter">
              <img src="img/counter_dark.png"/>
              <p>&nbsp;${parseFloat(capture.counter).toFixed(2).replace(`.`,`,`)}&nbsp;kWh</p>
          </div>

          <div class="energy-consumption">
            ${getImage(captures, count)}
            <div class="p-energy-consumption">
              <p>
              &nbsp;${calcDiff(captures, count)}&nbsp;
              </p>
              <h2>&nbsp;${getDate(captures, count)}</h2>
            </div>
          </div>
          
          <div class="headline-delete">
              <img src="img/delete.png" onclick="deleteCapture('${capture.id}')"/>
          </div>
      `;
      count = count+1;
          var captureLi = document.createElement("li");
          captureLi.innerHTML = captureHtmlContent;
          appendById("captures", captureLi);
      }
  } else {
      console.error("No captures provided to be shown")
  }
}


function calcDiff(captures, count){
  if(count == captures.length-1){
    return "";
  
  }
  else{
    return (captures[count].counter-captures[count+1].counter).toFixed(2).replace(`.`,`,`) +` kWh`;
  }
}

function calcDiffTotal(captures, count){
  if(count == captures.length-1){
    return "";
  
  }
  else{
    return (captures[count].counter-captures[captures.length-1].counter).toFixed(2).replace(`.`,`,`) +` kWh`;
  }
}

function getImage(captures, count){
  if(count == captures.length-1){
    return "";
  
  }
  else{
    return `<img src="img/energy-consumption_dark.png">`;
  }
}

function getImageLight(captures, count){
  if(count == captures.length-1){
    return "";
  
  }
  else{
    return `<img src="img/energy-consumption_light.png">`;
  }
}

function getDate(captures, count){
  if(count == captures.length-1){
    return "";
  }
  else{
    return formatDate(new Date(captures[count+1].date)) 
    + `-` 
    +formatDate(new Date(captures[count].date));
  }
}

function getDateTotal(captures, count){
  if(count == captures.length-1){
    return "";
  }
  else{
    return formatDate(new Date(captures[captures.length-1].date)) 
    + `-` 
    +formatDate(new Date(captures[count].date));
  }
}
/**
* Safely append a new element to an element identified by its ID.
* @param id The ID of the parent element.
* @param elementToAppend The new element to append.
*/
function appendById(id, elementToAppend) {
  var element = document.getElementById(id);
  if (element) {
      element.append(elementToAppend);
  } else {
      console.error(`Element with ID not found: ${id}`);
  }
}

/**
* Delete the capture with the given ID.
*
* @param id The ID of the capture to delete.
*/
function deleteCapture(id) {
  console.debug(`Attempting to delete capture with ID: ${id}`);

  var captures = loadStoredCaptures();
  if (captures && id) {
      for (var i = 0; i < captures.length; i++) {
          if (captures[i].id === id) {
              captures.splice(i, 1);
              storeCaptures(captures);
              cleanCaptureList();
              showCaptures(captures);

              console.info(`Deleted capture with ID: ${id}`);

              break;
          }
      }
  } else {
      console.error("Invalid arguments to remove capture");
  }
}

/**
* Remove all captures from the capture list.
*/
function cleanCaptureList() {

  var captureList = document.getElementById("captures");
  if (captureList) {
      captureList.innerHTML = "";
      console.debug("Cleared capture list");
  } else {
      console.error("Capture list not found");
  }
}

/**
* Properly format a date to be displayed.
*
* @param date The date to format.
* @returns {string} The formatted date.
*/
function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if (day < 10) {
      day = '0' + day;
  }
  if (month < 10) {
      month = '0' + month;
  }

  var formattedDate = `${day}.${month}.${year}`;
  console.debug(`Formatted date is: ${formattedDate}`);
  return formattedDate;
}