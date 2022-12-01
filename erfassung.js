function initialize() {
  console.debug("Initializing create and edit page")

  var launchId = new URLSearchParams(location.search).get("id");
    if (launchId) {
        console.debug(`Page loaded in edit mode for launch with ID: ${launchId}`);
        var launch = getLaunchById(loadStoredLaunches(),launchId);
        if (launch) {
            setValueById("date", launch.date);
            setValueById("counter", launch.counter);

            setTextContentById("save-button", "Speichern");
            setAttributeById("save-button", "onclick", `save('${launchId}')`);
        } else {
            console.error("Launch not found for ID: " + launchId);
        }
    } else {
        console.debug("Page loaded in create mode");
    }
}
  
  /**
  * Safely set the value of an element identified by its ID.
  *
  * @param id The ID of the element to search for.
  * @param value The value to set.
  */
  function setValueById(id, value) {
    var element = document.getElementById(id);
    if (element) {
        element.value = value;
    } else {
        console.error(`Element with ID does not exist: ${id}`);
    }
  }
  
  /**
  * Safely set the text content of an element identified by its ID.
  *
  * @param id The ID of the element to search for.
  * @param value The text content to set.
  */
  function setTextContentById(id, value) {
    var element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    } else {
        console.error(`Element with ID does not exist: ${id}`);
    }
  }
  
  /**
  * Safely set an attribute value of an element identified by its ID.
  *
  * @param id The ID of the element to search for.
  * @param attributeName The name of the attribute to set.
  * @param attributeValue The value of the attribute to set.
  */
  function setAttributeById(id, attributeName, attributeValue) {
    var element = document.getElementById(id);
    if (element) {
        element.setAttribute(attributeName, attributeValue);
    } else {
        console.error(`Element with ID does not exist: ${id}`);
    }
  }
  
  /**
  * Searches for a launch contained in the local storage.
  *
  * @param launches The list of launches to search in.
  * @param id The ID of the launch to search for.
  * @returns {any|undefined} The launch, if it was found.
  */
  function getLaunchById(launches, id) {
    for (var launch of launches) {
        if (launch.id === id) {
            return launch;
        }
    }
    return undefined;
  }
  
  /**
  * Save the data contained in the form.
  *
  * @param id The ID of the launch, if a launch should be updated.
  */
  function save(id) {
    var launches = loadStoredLaunches();
    var launch = createLaunchFromInput(id);
  
    if (id) {
        replaceLaunch(launches, id, launch);
    } else {
        launches.push(createLaunchFromInput());
    }
    storeLaunches(launches);
    console.debug("Launch saved");
  }
  
  /**
  * Replace a launch with a specific ID in a launch array.
  *
  * @param launches The array in which the launch should be replaced.
  * @param idToReplace The ID of the launch to replace.
  * @param updatedLaunch The launch object replacing the launch with the given ID.
  */
  function replaceLaunch(launches, idToReplace, updatedLaunch) {
    if (launches && idToReplace && updatedLaunch) {
        for (var i = 0; i < launches.length; i++) {
            if (launches[i].id === idToReplace) {
                launches[i] = updatedLaunch
                return;
            }
        }
    } else {
        console.error("Invalid arguments to replace launch");
    }
    console.error(`Element with ID not known: ${idToReplace}`);
  }
  
  /**
  * Create a launch object from the values of the form input fields related to a launch.
  *
  * @param id An existing ID, if it is known. If not provided, a new ID will be generated.
  * @returns {{date: (*|undefined), counter: (*|undefined), id: string}} Launch object.
  */
  function createLaunchFromInput(id) {
    var date = getInputValueById("date");
    var counter = getInputValueById("counter");
  
  
    // If no ID is provided, we create one
    if (!id) {
        id = crypto.randomUUID();
    }
  
    return {
        id: id,
        date: date,
        counter: counter,
        
        
    }
  }
  
  /**
  * Search for an HTML input element by its ID and return the value.
  *
  * @param id The ID of the HTML input element.
  * @returns {undefined|*} The value of the HTML input element, if one with the given ID exists.
  */
  function getInputValueById(id) {
    if (id) {
        var input = document.getElementById(id);
        if (input) {
            return input.value;
        } else {
            console.error(`Input with ID not found: ${id}`);
            return undefined;
        }
    }
  
    console.error("No ID provided");
    return undefined;
  }
  