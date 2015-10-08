$(document).ready(function () {
	
	$('#selectEpisode').change(function () {
		'http://kissanime.com/Anime/One-Piece/' + $(this).val()
        var newVid = "anime/AnimeUpload.com_One_Piece_" + $(this).val() + "_x264.mp4";
		$("#vid").attr("src", newVid)
		$("#vid").load();
    });
});