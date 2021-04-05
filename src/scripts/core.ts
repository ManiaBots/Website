setInterval(() => Array.from($("img")).forEach(element => $(element).attr("draggable", "false")), 1000);

let partners, partnerCount;

$.getJSON("../assets/partners.json", (data) => {
    partners = data.partners;
    partnerCount = data.partners.length;
});

if(window.location.pathname == "/") router("home");

$(document).ajaxStart(() => {
    if ($("#progress").length === 0) {
        $("body").append($("<div><dt/><dd/></div>").attr("id", "progress"));
        $("#progress").width((50 + Math.random() * 30) + "%");
    }
});

$(document).ajaxComplete(() => {
    $("#progress").width("101%").delay(200).fadeOut(400, () => $(this).remove());
});