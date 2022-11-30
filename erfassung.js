function initialize() {
  console.debug("Initializing create and edit page")

  var counterId = new URLSearchParams(location.search).get("id");
    if (counterId) {
        console.debug(`Page loaded in edit mode for task with ID: ${counterId}`);
        var counter = getTaskById(counterId);
        if (counter) {
            setValueById("due", counter.due);
            setValueById("counter", counter.counters);

            setTextContentById("page-title", "Aufgabe bearbeiten");
            setTextContentById("save-btn", "Speichern");
            setAttributeById("save-btn", "onclick", `save('${counterId}')`);
        } else {
            console.error("Counter not found for ID: " + counterId);
        }
    } else {
        console.debug("Page loaded in create mode");
    }
}