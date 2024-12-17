function initPage() {
    document.querySelector('.container').style.display = 'block';
    document.getElementById('forecast-content').style.display = 'none'; 
}
window.onload = initPage;
function showTodayForecast() {
    document.querySelector('.container').style.display = 'block';
    document.getElementById('forecast-content').style.display = 'none';
}
function showForecast() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('forecast-content').style.display = 'block';
}