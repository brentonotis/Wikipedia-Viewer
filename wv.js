$(document).ready(function(){
  $("#searchbtn").click(function(){
    var search = $("#search").val();
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + searchValue;
    $.ajax({
      url: url,
      async: false,
      type: "GET",
      dataType: "json",
      success: function(result){
        $("#output").empty();
        for(var i = 0; i < result[1].length; i++){
          $("#output").append("<li id=\"bullet\"><a target=\"_blank\" href="+result[3][i]+ ">" +result[1][i] +"</a></br>"+ result[2][i]+"</li>");
        };
      },
      error: function (failed){
        alert("API FAILED")
      }
    })

  })
  $("#search").keypress(function(event){
    if (event.which === 13){
      $("#searchbtn").click();
    }
  });
});
