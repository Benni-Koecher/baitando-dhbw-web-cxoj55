/**
 * Initialize the page. Will load all captures from the local storage and show them.
 */
 function initialize() {
  console.debug("Initializing list page")
  showCaptures(loadStoredCaptures());
}

/**
* Display the given captures in the launch list.
*
* @param captures The captures to show in the launch list.
*/
function showCaptures(captures) {
  if (captures) {  
    var count = 0; 
    var launchHtmlContentRed =`
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
        var launchLi = document.createElement("ol");
          launchLi.innerHTML = launchHtmlContentRed;
          appendById("captures", launchLi);
  
      for (var launch of captures) {
        
        console.log(count);
          var launchHtmlContent = `
          
          <div class="admin-date">
              <img src="img/calendar.png"/>
              <p>${formatDate(new Date(launch.date))}</p>
          </div>

          <div class="headline-counter">
              <img src="img/counter_dark.png"/>
              <p>&nbsp;${parseFloat(launch.counter).toFixed(2).replace(`.`,`,`)}&nbsp;kWh</p>
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
              <img src="img/delete.png" onclick="deleteCapture('${launch.id}')"/>
          </div>
      `;
      count = count+1;
          var launchLi = document.createElement("li");
          launchLi.innerHTML = launchHtmlContent;
          appendById("captures", launchLi);
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
* Delete the launch with the given ID.
*
* @param id The ID of the launch to delete.
*/
function deleteCapture(id) {
  console.debug(`Attempting to delete launch with ID: ${id}`);

  var captures = loadStoredCapturees();
  if (captures && id) {
      for (var i = 0; i < captures.length; i++) {
          if (captures[i].id === id) {
              captures.splice(i, 1);
              storeCaptures(captures);
              cleanCaptureList();
              showCapturees(captures);

              console.info(`Deleted launch with ID: ${id}`);

              break;
          }
      }
  } else {
      console.error("Invalid arguments to remove launch");
  }
}

/**
* Remove all captures from the launch list.
*/
function cleanCaptureList() {

  var launchList = document.getElementById("captures");
  if (launchList) {
      launchList.innerHTML = "";
      console.debug("Cleared launch list");
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