function initialize() {
  console.debug("Initializing create and edit page")

  var captureId = new URLSearchParams(location.search).get("id");
    if (captureId) {
        console.debug(`Page loaded in edit mode for capture with ID: ${captureId}`);
        var capture = getCaptureById(loadStoredCaptures(),captureId);
        if (capture) {
            setValueById("date", capture.date);
            setValueById("counter", capture.counter);

            setTextContentById("save-button", "Speichern");
            setAttributeById("save-button", "onclick", `save('${captureId}')`);
        } else {
            console.error("Capture not found for ID: " + captureId);
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
  * Searches for a capture contained in the local storage.
  *
  * @param captures The list of captures to search in.
  * @param id The ID of the capture to search for.
  * @returns {any|undefined} The capture, if it was found.
  */
  function getCaptureById(captures, id) {
    for (var capture of captures) {
        if (capture.id === id) {
            return capture;
        }
    }
    return undefined;
  }
  
  /**
  * Save the data contained in the form.
  *
  * @param id The ID of the capture, if a capture should be updated.
  */
  function save(id) {
    var captures = loadStoredCaptures();
    var capture = createCaptureFromInput(id);
  
    if (id) {
        replaceCapture(captures, id, capture);
    } else {
        captures.push(createCaptureFromInput());
    }
    storeCaptures(captures);
    console.debug("Capture saved");
  }
  
  /**
  * Replace a capture with a specific ID in a capture array.
  *
  * @param captures The array in which the capture should be replaced.
  * @param idToReplace The ID of the capture to replace.
  * @param updatedCapture The capture object replacing the capture with the given ID.
  */
  function replaceCapture(captures, idToReplace, updatedCapture) {
    if (captures && idToReplace && updatedCapture) {
        for (var i = 0; i < captures.length; i++) {
            if (captures[i].id === idToReplace) {
                captures[i] = updatedCapture
                return;
            }
        }
    } else {
        console.error("Invalid arguments to replace capture");
    }
    console.error(`Element with ID not known: ${idToReplace}`);
  }
  
  /**
  * Create a capture object from the values of the form input fields related to a capture.
  *
  * @param id An existing ID, if it is known. If not provided, a new ID will be generated.
  * @returns {{date: (*|undefined), counter: (*|undefined), id: string}} Capture object.
  */
  function createCaptureFromInput(id) {
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
  