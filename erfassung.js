function initialize() {
  console.debug("Initializing create and edit page")

  var counterId = new URLSearchParams(location.search).get("id");
    if (counterId) {
        console.debug(`Page loaded in edit mode for task with ID: ${counterId}`);
        var counter = getTaskById(counterId);
        if (counter) {
            setValueById("title", task.title);
            setValueById("notes", task.notes);
            setValueById("due", task.due);
            setValueById("responsible", task.responsible);

            setTextContentById("page-title", "Aufgabe bearbeiten");
            setTextContentById("save-btn", "Speichern");
            setAttributeById("save-btn", "onclick", `save('${taskId}')`);
        } else {
            console.error("Task not found for ID: " + taskId);
        }
    } else {
        console.debug("Page loaded in create mode");
    }
}