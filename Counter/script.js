var dcCount = 0;

function addDcCount() {
    dcCount += 1;
    console.log(dcCount);
    document.getElementById("dcCountText").innerHTML = dcCount;
}