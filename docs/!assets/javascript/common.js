
var summaryOn = false;

// Toggle summary handler
function toggleSummary(e) {
    var summary = document.querySelector(".summary");
    if(!summary) {
        return;
    }
    summary.querySelector(".toggle").addEventListener("click", function(e){
        e.preventDefault();

        summaryOn = !summaryOn;
        this.innerHTML = (summaryOn ? "Masquer le sommaire" : "Afficher le sommaire");

        if(summaryOn) {
            summary.classList.remove("hide");
        } else {
            summary.classList.add("hide");
        }
    });
}

// Init
window.onload = function() {
    toggleSummary();
};
