var elemList = [1, 2];    

$("#add-more").click(function(){
    var newIn = '<div class="row valign-wrapper no-mar-bot" id="form'+(elemList[elemList.length-1]+1)+'"><div class="col m1 center"><div class="circle"></div></div><div class="input-field col m9"><div class="address-wrap"><input id="address'+(elemList[elemList.length-1]+1)+'" class="controlsInput" placeholder="Enter your address" onFocus="geolocate()" type="text"><label for="address'+(elemList[elemList.length-1]+1)+'">Address '+(elemList[elemList.length-1]+1)+'</label></div></div><div class="col m2 center valign-wrapper"><button class="remove-btn" id="remove-btn'+(elemList[elemList.length-1]+1)+'" onClick="rm(this)">-</button></div></div>';

    var prevInput = $('#form'+elemList[elemList.length-1]);
    var newInput = $(newIn);
    $(prevInput).after(newInput);
    elemList.push(elemList[elemList.length-1] + 1);

    $('#form'+elemList[elemList.length-1]).each(function(){
          color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
          colorList.push(color);
          $(this).find('.circle').css('background', color);
    });
});


function rm(currentElement) {
    $(currentElement).parent().parent().remove();
    index = parseInt(currentElement.id.charAt(currentElement.id.length-1));
    elemList = $.grep(elemList, function(value) {
        return value != index;
    });

}
