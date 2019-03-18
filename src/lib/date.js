
  function getFormattedDate(today) {
    if(!today) return ''
    // var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    // var day  = week[today.getDay()];
    var dd   = today.getDate();
    var mm   = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();

    if(dd<10)  { dd='0'+dd } 
    if(mm<10)  { mm='0'+mm } 
    if(minu<10){ minu='0'+minu } 

    return dd+'/'+mm+'/'+yyyy+' '+hour+':'+minu;
    // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hour+':'+minu;
  }

  module.exports = {getFormattedDate}