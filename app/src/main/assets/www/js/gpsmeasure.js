document.addEventListener('deviceready', function(){
	if (!navigator.geolocation) {
		$("#message").text("お使いの端末ではご利用できません");
		return;
	}

	var geoOptions = { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };

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

	// テスト用
	$("#setA").click(function() {
		$("#latitudeA").text($("#latitudeDummy").val());
		$("#longitudeA").text($("#longitudeDummy").val());
		setDistance();
	});
	$("#setB").click(function() {
		$("#latitudeB").text($("#latitudeDummy").val());
		$("#longitudeB").text($("#longitudeDummy").val());
		setDistance();
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
