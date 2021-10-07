window.received_data = false;

const ELEMENTS = [
    "dailytimetable",
    "announcements",
    "timetable"
]

window.onUserData = async () => {
    var promises = [];

    ELEMENTS.forEach(element => {
        promises.push(GetResourceFromCache(element).then(resource => {
            document.getElementById(element).setAttribute("data", resource);
        }));
    });

    promises.push(GetResourceFromCache("userinfo").then(resource => {
        document.getElementById("barcode").setAttribute("data", resource);
    }));

    promises.push(GetResourceFromCache("dailytimetable").then(resource => {
        var day = JSON.parse(resource).timetable.timetable.dayname;

        document.getElementById("timetable").setAttribute("day", day);
    }));

    await Promise.all(promises);

    window.received_data = true;

    if (window.page) document.getElementById(window.page).classList.remove("hidden");
}