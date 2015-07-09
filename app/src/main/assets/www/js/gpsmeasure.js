document.addEventListener('deviceready', function(){
	if (!navigator.geolocation) {
		$("#message").text("お使いの端末ではご利用できません");
		return;
	}

	var geoOptions = { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };

	// ボタン押下時のレイアウトチェンジ
	$('#btnA').bind('touchstart', function() {changeImage("btnA","./img/a_button_onClick.png");});
	$('#btnA').bind('touchend', function() {changeImage("btnA","./img/a_button.png");});
	$('#btnB').bind('touchstart', function() {changeImage("btnB","./img/b_button_onClick.png");});
	$('#btnB').bind('touchend', function() {changeImage("btnB","./img/b_button.png");});
	$('#btnR').bind('touchstart', function() {changeImage("btnR","./img/clear_button_onClick.png");});
	$('#btnR').bind('touchend', function() {changeImage("btnR","./img/clear_button.png");});

	$("#btnA").click(function() {
		navigator.geolocation.getCurrentPosition(function(position) {
			$("#latitudeA").text(position.coords.latitude);
			$("#longitudeA").text(position.coords.longitude);
			setDistance();
		},
		function(e) {
			$("#message").text("Ａ地点の位置情報が取得できませんでした");
		}, geoOptions);
	});

	$("#btnB").click(function() {
		navigator.geolocation.getCurrentPosition(function(position) {
			$("#latitudeB").text(position.coords.latitude);
			$("#longitudeB").text(position.coords.longitude);
			setDistance();
		},
		function(e) {
			$("#message").text("Ｂ地点の位置情報が取得できませんでした");
		}, geoOptions);
	});

	$("#btnR").click(function() {
		$("#latitudeA").text("");
		$("#longitudeA").text("");
		$("#latitudeB").text("");
		$("#longitudeB").text("");
		$("#distance").text("");
		$("#message").text("");
	});
}, false);

function setDistance() {
	if ($("#latitudeA").text() == "" || $("#latitudeB").text() == "") {
		return;
	}

	var positionA = {};
	var positionB = {};
	positionA["latitude"] = $("#latitudeA").text();
	positionA["longitude"] = $("#longitudeA").text();
	positionB["latitude"] = $("#latitudeB").text();
	positionB["longitude"] = $("#longitudeB").text();

	$("#distance").text(geolib.getDistance(positionA, positionB) + " (m)");
}

// 画像差し替え用処理
function changeImage( imgid , newimg ) {
   document.getElementById(imgid).src = newimg;
}
// 遅延実行
function sleep(time, callback) {
	setTimeout(callback, time)
}